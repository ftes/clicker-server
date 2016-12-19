const port = 4000;
const host = 'localhost';

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
  'getBatteryLevel',
  'batteryLevel',
  'buttonEvent',
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})

module.exports = {
  port,
  host,
  messageTypes,
  uri: `http://${host}:${port}`
}