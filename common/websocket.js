const port = 4000;
const host = 'localhost';
const uri = `http://${host}:${port}`

const BATTERY_LEVEL_REQUEST = 'clicker/battery-level/REQUEST'
const BATTERY_LEVEL_RESPONSE = 'clicker/battery-level/RESPONSE'
const BUTTON_EVENT = 'clicker/button/EVENT'

const messageTypes = [
  BATTERY_LEVEL_REQUEST,
  BATTERY_LEVEL_RESPONSE,
  BUTTON_EVENT,
]

module.exports = {
  uri,
  BATTERY_LEVEL_REQUEST,
  BATTERY_LEVEL_RESPONSE,
  BUTTON_EVENT,
  messageTypes,
}