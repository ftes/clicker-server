let websocket = require('../common/websocket')
let server = require('http').Server()
let io = require('socket.io')(server)
let rxjs = require('rxjs')
let argv = require('yargs').argv
let Xbee = require('./connectors/xbee')

/** expects events of format [type, payload] */
let outboundMessages = new rxjs.Subject()
let send = (type, payload) => outboundMessages.next([type, payload])

// device connectors
let connectors = [new Xbee(send, argv.tty)]

// open websocket and handle events
io.on('connection', function (client) {
  console.log('client connected')

  // emit outboundMessages
  outboundMessages.subscribe(([type, payload]) => client.emit(type, payload))

  client.on('disconnect', () => console.log('client disconnected'))

  // pass on battery level request to connectors
  client.on(websocket.BATTERY_LEVEL_REQUEST, () => {
    console.log('request battery level')
    connectors.map(c => c.requestBatteryLevel())
  })
})

server.listen(argv.p || 4000)