import _ from 'lodash';

function selectHalf(devices) {
  const shuffled = _.shuffle(devices);
  const half = Math.ceil(devices.length / 2);
  return shuffled.slice(0, half).sort();
}

function selectDifferentHalf(devices, previous = []) {
  // cannot be different if less than one answered
  if (devices.length <= 1) return selectHalf(devices);

  let equal = true;
  let half;
  while (equal) {
    half = selectHalf(devices);
    equal = _.isEqual(half, previous);
  }
  return half;
}

export default function (
  settings, devices, selectedDeviceKey, answeredBy,
  devicesSettings, toServerTime,
) {
  const result = [];
  const n = settings.randomN;
  const stepDuration = settings.showdownDurationMs / n;
  let time = toServerTime(new Date().getTime());
  let previousHalf;
  for (let i = 0; i < n - 1; i++) {
    const half = selectDifferentHalf(answeredBy, previousHalf);
    previousHalf = half;
    result.push({
      devices: half,
      time: time += stepDuration,
    });
  }
  result.push({
    devices: [selectedDeviceKey],
    time,
  });
  return result;
}
