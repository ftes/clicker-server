let xbeeRx = require('xbee-rx');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let xbee = xbeeRx({
    serialport: '/dev/ttyUSB2',
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

    client.on('battery level?', function (msg) {
        console.log('battery level?');

        xbee.remoteCommand({
            command: "%V",
            broadcast: true
        }).subscribe(response => {
            client.emit('battery level', {
                deviceType: 'xbee',
                deviceId: response.remote64,
                volt: byteArrayToLong(response.commandData) * 1200 / 1024 / 1000,
            });
        }, e => {
            console.log("Check battery command failed:\n", e);
        });
    });
});
server.listen(3000);


function byteArrayToLong(byteArray) {
    let n = 0;
    for (let i=0; i<byteArray.length; i++) {
        n = n * 256 + byteArray[i];
    }
    return n;
};