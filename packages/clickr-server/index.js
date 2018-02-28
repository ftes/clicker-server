const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const argv = require('yargs').argv
const cors = require('cors')
const Dummy = require('./connectors/dummy')
const Websocket = require('./connectors/websocket')
const { BATTERY_REQUEST, TEACHER_STATE, TEACHER_SYNC_ENABLE,
  TEACHER_SYNC_FIRST_CLIENT, TIME }
  = require('./common/websocket/message-types')
const { TEACHER } = require('./common/websocket/namespaces')

const syncRoom = 'sync'

class Server {
  constructor() {
    const server = this.setupServer()
    const io = this.setupWebsocket(server)
    this.setupConnectors(io)
    server.listen(process.env.PORT || 4000)
  }

  setupServer() {
    const app = express()
    app.use(cors())
    const server = http.Server(app)
    // compiled web interfaces
    app.use(express.static(__dirname + '/public'))
    return server
  }

  deleteStateIfLastSyncClientLeft() {
    // reset cached state if last syncing client left
    const rooms = this.teacherNsp.adapter.rooms
    const syncingClients = syncRoom in rooms ? rooms[syncRoom].length : 0
    if (syncingClients === 0) {
      console.log('deleting cached state (last syncing teacher disconnected)')
      delete this.teacherState
    }
  }

  setupWebsocket(server) {
    const io = socketIO(server)
    const teacherNsp = io.of(TEACHER)
    this.teacherNsp = teacherNsp

    teacherNsp.on('connection', (socket) => {
      console.log('teacher connected')
      socket.on('disconnect', () => {
        console.log('teacher disconnected')
        this.deleteStateIfLastSyncClientLeft()
      })

      // send server time
      socket.emit(TIME, new Date().getTime())

      // pass on battery level request to connectors
      socket.on(BATTERY_REQUEST, () => {
        console.log('request battery level')
        this.connectors.forEach(c => c.requestBatteryLevel())
      })

      socket.on(TEACHER_STATE, (teacherState) => {
        this.teacherState = teacherState
        // forward state to all other syncing teacher devices
        socket.broadcast.to(syncRoom).emit(TEACHER_STATE, teacherState)
      })

      socket.on(TEACHER_SYNC_ENABLE, (enabled) => {
        if (enabled) {
          console.log('teacher started syncing')
          socket.join(syncRoom)
          if (this.teacherState) {
            socket.emit(TEACHER_STATE, this.teacherState)
          } else {
            socket.emit(TEACHER_SYNC_FIRST_CLIENT)
          }
        } else {
          console.log('teacher stopped syncing')
          socket.leave(syncRoom)
          this.deleteStateIfLastSyncClientLeft()
        }
      })

    })
    return io
  }

  setupConnectors(io) {
    const connectors = []
    //skip xbee connector
    const sendToTeacher = (...args) => this.sendToTeacher(...args)
    connectors.push(new Dummy(sendToTeacher, argv.dummy || '/tmp/dummy'))
    connectors.push(new Websocket(sendToTeacher, io))
    this.connectors = connectors
  }

  sendToTeacher(type, payload) {
    this.teacherNsp.emit(type, payload)
  }
}

// run
new Server()