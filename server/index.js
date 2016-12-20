let websocket = require('../common/websocket')
let server = require('http').Server()
let io = require('socket.io')(server)
let rxjs = require('rxjs')
let argv = require('yargs').argv
let Xbee = require('./connectors/xbee')
let Dummy = require('./connectors/dummy')

/** expects events of format [type, payload] */
let outboundMessages = new rxjs.Subject()
let send = (type, payload) => outboundMessages.next([type, payload])

// device connectors
let tty = argv.tty || '/dev/ttyUSB0'
let dummyFile = argv.dummy || '/tmp/dummy'
let connectors = [new Xbee(send, tty), new Dummy(send, dummyFile)]

// open websocket and handle events
io.on('connection', function (socket) {
  console.log('client connected')

  // emit outboundMessages
  outboundMessages.subscribe(([type, payload]) => socket.emit(type, payload))

  socket.on('disconnect', () => console.log('client disconnected'))

  // pass on battery level request to connectors
  socket.on(websocket.BATTERY_LEVEL_REQUEST, () => {
    console.log('request battery level')
    connectors.map(c => c.requestBatteryLevel())
  })
})

server.listen(argv.p || 4000)