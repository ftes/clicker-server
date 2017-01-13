const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const rxjs = require('rxjs')
const argv = require('yargs').argv
const cors = require('cors')
const Dummy = require('./connectors/dummy')
const Websocket = require('./connectors/websocket')
const { BATTERY_REQUEST, TEACHER } =
  require('../common/message-types')

class Server {
  constructor() {
    // expects events of format [type, payload]
    this.teacherDevices = new rxjs.Subject()
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

  setupWebsocket(server) {
    const io = socketIO(server)

    io.on('connection', (socket) => {
      // pass on battery level request to connectors
      socket.on(BATTERY_REQUEST, () => {
        console.log('request battery level')
        this.connectors.map(c => c.requestBatteryLevel())
      })

      // subscribe teacher devices to teacher message queue
      socket.on(TEACHER, () => {
        console.log('teacher connected')
        this.teacherDevices.subscribe(([type, payload]) =>
          socket.emit(type, payload))
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
    this.teacherDevices.next([type, payload])
  }
}

// run
new Server()