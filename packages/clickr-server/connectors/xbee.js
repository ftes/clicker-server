let xbeeRx = require('xbee-rx')
let devices = require('../common/devices')
let websocket = require('../common/websocket')

function byteArrayToLong(byteArray) {
  let n = 0
  for (let i = 0; i < byteArray.length; i++) {
    n = n * 256 + byteArray[i]
  }
  return n
}

class Xbee {
  constructor(send, serialPort) {
    this.send = send

    // connect to serial port
    this.xbee = xbeeRx({
      serialport: serialPort,
      serialPortOptions: {
        baudrate: 9600,
      },
      module: 'ZigBee'
    })

    // pass on incoming sensor values to client as button press events
    this.xbee.monitorIODataPackets().subscribe(frame => {
      let pressed = frame.digitalSamples.DIO4 === 0
      let payload = devices.json(devices.XBEE, frame.remote64, { pressed })
      send(websocket.BUTTON_EVENT, payload)
    })
  }

  requestBatteryLevel() {
    this.xbee.remoteCommand({
      command: '%V',
      broadcast: true
    }).subscribe(frame => {
      // convert reading to V: * 1.2 / 1024
      let raw = byteArrayToLong(frame.commandData) * 1.2 / 1024
      let payload = devices.json(devices.XBEE, frame.remote64, { raw })
      this.send(websocket.BATTERY_LEVEL_RESPONSE, payload)
    }, e => {
      console.warn('Failed to check Xbee battery levels:\n', e)
    })
  }
}

module.exports = Xbee