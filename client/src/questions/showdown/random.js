import _ from 'lodash'

function selectHalf(devices) {
  let shuffled = _.shuffle(devices)
  let half = Math.ceil(devices.length / 2)
  return shuffled.slice(0, half).sort()
}

function selectDifferentHalf(devices, previous=[]) {
  let equal = true
  let half
  while (equal) {
    half = selectHalf(devices)
    equal = _.isEqual(half, previous)
  }
  return half
}

export default function(settings, devices, selectedDeviceKey, answeredBy) {
  let result = []
  let n = settings.randomN
  let stepDuration = settings.showdownDurationMs / n
  let time = new Date().getTime()
  let previousHalf
  for (let i = 0; i < n - 1; i++) {
    let half = selectDifferentHalf(answeredBy, previousHalf)
    previousHalf = half
    result.push({
      devices: half,
      time: time += stepDuration
    })
  }
  result.push({
    devices: [ selectedDeviceKey ],
    time,
  })
  return result
}