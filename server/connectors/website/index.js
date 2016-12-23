let express = require('express')
let http = require('http')
let socketIO = require('socket.io')
let websocket = require('../../../common/websocket')
let devices = require('../../../common/devices')

class Website {
  constructor(send, port) {
    let app = express()
    let server = http.Server(app)
    this.io = socketIO(server)
    app.use(express.static(__dirname + '/public'))
    server.listen(port || 4001)

    this.io.on('connection', function (socket) {
      socket.on('press', function ({ deviceId, pressed }) {
        console.log(`website press: ${deviceId} ${pressed}`)
        let payload = devices.json(devices.WEBSITE, `${deviceId}`, { pressed })
        send(websocket.BUTTON_EVENT, payload)
      })

      socket.on('battery', function ({ deviceId, raw }) {
        console.log(`battery level: ${deviceId} ${(raw * 100).toFixed(2)}%`)
        let payload = devices.json(devices.WEBSITE, `${deviceId}`, { raw })
        send(websocket.BATTERY_LEVEL_RESPONSE, payload)
      })
    })
  }

  requestBatteryLevel() {
    this.io.sockets.emit('battery?')
  }
}

module.exports = Website