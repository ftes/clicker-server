let fs = require('fs')
let chokidar = require('chokidar')
let { PRESS, BATTERY_RESPONSE } = require('../../common/message-types')

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
        let deviceId = buffer.toString('utf8', 0, size)

        // trim whitespace (trailing newline)
        deviceId = deviceId.replace(/(^\s+|\s+$)/g,'')
        console.log(`dummy button press: '${deviceId}'`)
        this.ids[deviceId] = true

        // send button press and release
        let payload = { deviceType: 'dummy', deviceId, pressed: true }
        send(PRESS, payload)
        setTimeout(() => {
          send(PRESS, Object.assign(payload, { pressed: false }))
        }, 200)
      })
    })
  }

  requestBatteryLevel() {
    Object.keys(this.ids).map(deviceId => {
      let payload = { deviceType: 'dummy', deviceId, level: Math.random() }
      this.send(BATTERY_RESPONSE, payload)
    })
  }
}

module.exports = Dummy