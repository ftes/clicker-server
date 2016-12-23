let websocket = require('../common/websocket')
let server = require('http').Server()
let io = require('socket.io')(server)
let rxjs = require('rxjs')
let argv = require('yargs').argv
let Xbee = require('./connectors/xbee')
let Dummy = require('./connectors/dummy')
let Website = require('./connectors/website')

/** expects events of format [type, payload] */
let outboundMessages = new rxjs.Subject()
let send = (type, payload) => outboundMessages.next([type, payload])

// device connectors
let tty = argv.tty
let dummyFile = argv.dummy
let web = argv.web
let connectors = []
if (tty) connectors.push(new Xbee(send, tty))
if (dummyFile) connectors.push(new Dummy(send, dummyFile))
if (web) connectors.push(new Website(send, parseInt(web, 10)))

// open websocket and handle events
io.on('connection', function (socket) {
  console.log('client connected')

  socket.on('disconnect', () => console.log('client disconnected'))

  // pass on battery level request to connectors
  socket.on(websocket.BATTERY_LEVEL_REQUEST, () => {
    console.log('request battery level')
    connectors.map(c => c.requestBatteryLevel())
  })
})

// emit outboundMessages
outboundMessages.subscribe(([type, payload]) => io.sockets.emit(type, payload))

server.listen(argv.p || 4000)