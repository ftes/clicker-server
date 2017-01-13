const rxjs = require('rxjs')
const { STUDENT, BATTERY_REQUEST, BATTERY_RESPONSE, PRESS }
  = require('../../common/message-types')

class Websocket {
  constructor(sendToTeacher, io) {
    this.sendToTeacher = sendToTeacher
    // expects events of format [type, payload]
    this.studentDevices = new rxjs.Subject()
    this.setupWebsocket(io)
  }

  setupWebsocket(io) {
    io.on('connection', (socket) => {
      // subscribe student devices to student message queue
      socket.on(STUDENT, () => {
        console.log('student connected')
        this.studentDevices.subscribe(([type, payload]) =>
          socket.emit(type, payload))
      })

      // pass on battery response to teacher
      socket.on(BATTERY_RESPONSE, (payload) => {
        this.sendToTeacher(BATTERY_RESPONSE, payload)
      })

      // pass on button press to teacher
      socket.on(PRESS, (payload) => {
        this.sendToTeacher(PRESS, payload)
      })
    })
  }

  sendToStudents(type, payload) {
    this.studentDevices.next([type, payload])
  }

  requestBatteryLevel() {
    this.sendToStudents(BATTERY_REQUEST)
  }
}

module.exports = Websocket