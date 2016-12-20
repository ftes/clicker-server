let fs = require('fs')
let chokidar = require('chokidar')
let websocket = require('../../common/websocket')
let devices = require('../../common/devices')

/**
 * Every change of `charFile` triggers a dummy button press.
 * The content of `charFile` is used as the dummy device id.
 * Write to `charFile` with: `echo id > /tmp/dummy`
 */
class Dummy {
  constructor(send, charFile) {
    this.send = send
    this.ids = {}

    fs.open(charFile, 'r', (err, fd) => {
      let watcher = chokidar.watch(charFile)
      watcher.on('change', () => {
        let size = fs.fstatSync(fd).size
        let buffer = new Buffer(size)
        fs.readSync(fd, buffer, 0, size, 0)
        let id = buffer.toString('utf8', 0, size)

        // trim whitespace (trailing newline)
        id = id.replace(/(^\s+|\s+$)/g,'')
        console.log(`dummy button press: '${id}'`)
        this.ids[id] = true

        // send button press and release
        let payload = devices.json(devices.DUMMY, id, { pressed: true })
        send(websocket.BUTTON_EVENT, payload)
        setTimeout(() => send(websocket.BUTTON_EVENT, Object.assign(payload, { pressed: false })), 200)
      })
    })
  }

  requestBatteryLevel() {
    Object.keys(this.ids).map(id => {
      let payload = devices.json(devices.DUMMY, id, { raw: Math.random() })
      this.send(websocket.BATTERY_LEVEL_RESPONSE, payload)
    })
  }
}

module.exports = Dummy