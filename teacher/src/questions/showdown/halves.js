import { buildRows } from '../../devices/device-list/device-list'

function getWidth(rows) {
  return rows[0].length
}

function getHeight(rows) {
  return rows.length
}

function recursiveHalves(result, remaining, selectedDeviceKey) {
  let width = getWidth(remaining)
  let height = getHeight(remaining)

  if (width === 1 && height === 1) return result
  
  let vertical = width >= height
  let size = vertical ? width : height
  let half1, half2
  let round = Math.random() > 0.5 ? Math.floor : Math.ceil
  let cutIndex = round(size / 2) // exclusive
  if (vertical) {
    half1 = remaining.map(row => row.slice(0, cutIndex))
    half2 = remaining.map(row => row.slice(cutIndex))
  } else {
    half1 = remaining.slice(0, cutIndex)
    half2 = remaining.slice(cutIndex)
  }
  let selectedIn1 = half1.find(row =>
    row.find(key => key === selectedDeviceKey))
  let selectedHalf = selectedIn1 ? half1 : half2
  result = [
    ...result,
    selectedHalf
  ]
  return recursiveHalves(result, selectedHalf, selectedDeviceKey)
}

export default function(settings, devices, selectedDeviceKey, answeredBy,
  devicesSettings) {
  let rows = buildRows(devices, devicesSettings.rowWidth)
  rows = rows.map(row => row.map(device => device.deviceKey))
  let halvesInRows = recursiveHalves([rows], rows, selectedDeviceKey)
  let halves = halvesInRows.map(half => [].concat(...half))
  let stepDuration = settings.showdownDurationMs / halves.length
  let time = new Date().getTime()
  let result = halves.map(half =>
    ({ devices: half, time: time += stepDuration }))
  return result
}