import { buildRows } from '../../devices/device-list/device-list';

function getWidth(rows) {
  return rows[0].length;
}

function getHeight(rows) {
  return rows.length;
}

function recursiveHalves(result, remaining, selectedDeviceKey) {
  const width = getWidth(remaining);
  const height = getHeight(remaining);

  if (width === 1 && height === 1) return result;

  const vertical = width >= height;
  const size = vertical ? width : height;
  let half1;
  let half2;
  const round = Math.random() > 0.5 ? Math.floor : Math.ceil;
  const cutIndex = round(size / 2); // exclusive
  if (vertical) {
    half1 = remaining.map(row => row.slice(0, cutIndex));
    half2 = remaining.map(row => row.slice(cutIndex));
  } else {
    half1 = remaining.slice(0, cutIndex);
    half2 = remaining.slice(cutIndex);
  }
  const selectedIn1 = half1.find(row =>
    row.find(key => key === selectedDeviceKey));
  const selectedHalf = selectedIn1 ? half1 : half2;
  const modifiedResult = [
    ...result,
    selectedHalf,
  ];
  return recursiveHalves(modifiedResult, selectedHalf, selectedDeviceKey);
}

export default function (
  settings, devices, selectedDeviceKey, answeredBy,
  devicesSettings, toServerTime,
) {
  let rows = buildRows(devices, devicesSettings.rowWidth);
  rows = rows.map(row => row.map(device => device.deviceKey));
  const halvesInRows = recursiveHalves([rows], rows, selectedDeviceKey);
  const halves = halvesInRows.map(half => [].concat(...half));
  const stepDuration = settings.showdownDurationMs / halves.length;
  let time = toServerTime(new Date().getTime());
  const result = halves.map((half) => {
    time += stepDuration;

    return {
      devices: half,
      time,
    };
  });
  return result;
}
