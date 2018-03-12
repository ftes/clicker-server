// eslint-disable-next-line import/prefer-default-export
export function key({ deviceType, deviceId }) {
  return `${deviceType}/${deviceId}`;
}
