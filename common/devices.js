const XBEE = 'xbee'
const DUMMY = 'dummy'
const WEBSITE = 'website'

const deviceTypes = [
  XBEE,
  DUMMY,
  WEBSITE,
]

const convertBatteryLevel = {
  [XBEE]: (raw) => {
    let min = 3.3
    let max = 3.7
    if (raw > max) raw = max
    if (raw < min) raw = min
    return (raw - min) / (max - min)
  },

  [DUMMY]: (raw) => raw,

  [WEBSITE]: (raw) => raw,
}

function json(deviceType, deviceId, payload) {
  return Object.assign({
    deviceType,
    deviceId
  }, payload)
}

module.exports = {
  XBEE,
  DUMMY,
  WEBSITE,
  deviceTypes,
  convertBatteryLevel,
  json,
}