const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const rxjs = require('rxjs')
const argv = require('yargs').argv
const cors = require('cors')
const { BATTERY_REQUEST } = require('../common/message-types')

/** expects events of format [type, payload] */
let outboundMessages = new rxjs.Subject()
let send = (type, payload) => outboundMessages.next([type, payload])

// compiled web interface
let app = express()
app.use(cors())
let server = http.Server(app)
app.use(express.static(__dirname + '/public'))

// open websocket and handle events
let io = socketIO(server)

// device connectors
let connectors = []
// let tty = argv.tty
// if (tty){
//   let Xbee = require('./connectors/xbee')
//   connectors.push(new Xbee(send, tty))
// }
let dummy = argv.dummy
if (dummy) {
  let Dummy = require('./connectors/dummy')
  connectors.push(new Dummy(send, dummy))
} 

io.on('connection', function (socket) {
  console.log('client connected')

  socket.on('disconnect', () => console.log('client disconnected'))

  // pass on battery level request to connectors
  socket.on(BATTERY_REQUEST, () => {
    console.log('request battery level')
    connectors.map(c => c.requestBatteryLevel())
  })
})

// emit outboundMessages
outboundMessages.subscribe(([type, payload]) => io.sockets.emit(type, payload))

server.listen(argv.p || 4000)