var socket = io();
socket.on('connect', function () {
    console.log('connected');
});
socket.on('event', function (data) {
    console.log(data);
});
socket.on('disconnect', function () {
    console.log('disconnected');
});
socket.on('battery level', data => {
   console.log(`battery level of ${data.deviceId}: ${data.volt} V`); 
});
socket.on('button event', data => {
   console.log(`button of ${data.deviceId} pressed: ${data.pressed}`); 
});

$(() => {
    $('form').submit(function (event) {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        event.preventDefault();
    });
});

function requestBatteryLevel() {
    socket.emit('battery level?');
}