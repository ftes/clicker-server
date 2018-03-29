import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import { argv } from 'yargs';
import cors from 'cors';
import {
  BATTERY_REQUEST, TEACHER_STATE, TEACHER_SYNC_ENABLE,
  TEACHER_SYNC_FIRST_CLIENT, TIME, TEACHER,
} from '@clickr/common/lib/websocket';

import Dummy from './connectors/dummy';
import Websocket from './connectors/websocket';

const syncRoom = 'sync';

class Server {
  constructor() {
    this.setupServer();
    this.setupWebsocket();
    this.setupConnectors();
  }

  setupServer() {
    const app = express();
    app.use(cors());
    // eslint-disable-next-line babel/new-cap
    this.server = http.Server(app);
    // compiled web interfaces
    app.use(express.static(`${__dirname}/static`));
  }

  run() {
    this.server.listen(process.env.PORT || 4000);
  }

  deleteStateIfLastSyncClientLeft() {
    // reset cached state if last syncing client left
    const { adapter: { rooms } } = this.teacherNsp;
    const syncingClients = syncRoom in rooms ? rooms[syncRoom].length : 0;
    if (syncingClients === 0) {
      console.log('deleting cached state (last syncing teacher disconnected)');
      delete this.teacherState;
    }
  }

  setupWebsocket() {
    this.io = socketIO(this.server);
    const teacherNsp = this.io.of(TEACHER);
    this.teacherNsp = teacherNsp;

    teacherNsp.on('connection', (socket) => {
      console.log('teacher connected');
      socket.on('disconnect', () => {
        console.log('teacher disconnected');
        this.deleteStateIfLastSyncClientLeft();
      });

      // send server time
      socket.emit(TIME, new Date().getTime());

      // pass on battery level request to connectors
      socket.on(BATTERY_REQUEST, () => {
        console.log('request battery level');
        this.connectors.forEach(c => c.requestBatteryLevel());
      });

      socket.on(TEACHER_STATE, (teacherState) => {
        this.teacherState = teacherState;
        // forward state to all other syncing teacher devices
        socket.broadcast.to(syncRoom).emit(TEACHER_STATE, teacherState);
      });

      socket.on(TEACHER_SYNC_ENABLE, (enabled) => {
        if (enabled) {
          console.log('teacher started syncing');
          socket.join(syncRoom);
          if (this.teacherState) {
            socket.emit(TEACHER_STATE, this.teacherState);
          } else {
            socket.emit(TEACHER_SYNC_FIRST_CLIENT);
          }
        } else {
          console.log('teacher stopped syncing');
          socket.leave(syncRoom);
          this.deleteStateIfLastSyncClientLeft();
        }
      });
    });
  }

  setupConnectors() {
    const connectors = [];
    // skip xbee connector
    const sendToTeacher = (...args) => this.sendToTeacher(...args);
    connectors.push(new Dummy(sendToTeacher, argv.dummy || '/tmp/dummy'));
    connectors.push(new Websocket(sendToTeacher, this.io));
    this.connectors = connectors;
  }

  sendToTeacher(type, payload) {
    this.teacherNsp.emit(type, payload);
  }
}

const server = new Server();
server.run();
