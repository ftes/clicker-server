const { BATTERY_REQUEST, BATTERY_RESPONSE, PRESS }
  = require('@clickr/common/lib/websocket/message-types')
const { STUDENT } = require('@clickr/common/lib/websocket/namespaces')

class Websocket {
  constructor(sendToTeacher, io) {
    this.sendToTeacher = sendToTeacher
    this.setupWebsocket(io)
  }

  setupWebsocket(io) {
    const studentNsp = io.of(STUDENT)
    this.studentNsp = studentNsp

    studentNsp.on('connection', (socket) => {
      console.log('student connected')
      socket.on('disconnect', () => console.log('student disconnected'))

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
    this.studentNsp.emit(type, payload)
  }

  requestBatteryLevel() {
    this.sendToStudents(BATTERY_REQUEST)
  }
}

module.exports = Websocket