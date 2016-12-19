let config = require('./common/websocket')
let xbeeRx = require('xbee-rx');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let xbee = xbeeRx({
    serialport: '/dev/ttyUSB1',
    serialPortOptions: {
        baudrate: 9600,
    },
    module: "ZigBee"
});

let ioData = xbee.monitorIODataPackets();
app.use(express.static('public'));
io.on('connection', function (client) {
    console.log('client connected');

    ioData.subscribe(data => {
        client.emit('button event', {
            deviceType: 'xbee',
            deviceId: data.remote64,
            pressed: data.digitalSamples.DIO4 === 0,
        });
    });

    client.on('event', function (data) {
        console.log(data);
    });

    client.on('disconnect', function () {
        console.log('client disconnected');
    });

    client.on(config.messageTypes.getBatteryLevel, function (msg) {
        console.log('battery level?');

        xbee.remoteCommand({
            command: "%V",
            broadcast: true
        }).subscribe(response => {
            client.emit(config.messageTypes.batteryLevel, {
                deviceType: 'xbee',
                deviceId: response.remote64,
                volt: byteArrayToLong(response.commandData) * 1200 / 1024 / 1000,
            });
        }, e => {
            console.log("Check battery command failed:\n", e);
        });
    });
});
server.listen(4000);


function byteArrayToLong(byteArray) {
    let n = 0;
    for (let i = 0; i < byteArray.length; i++) {
        n = n * 256 + byteArray[i];
    }
    return n;
};