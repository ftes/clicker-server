import fs from 'fs';
import chokidar from 'chokidar';
import { PRESS, BATTERY_RESPONSE } from '@clickr/common/lib/websocket';

/**
 * Every change of `charFile` triggers a dummy button press.
 * The content of `charFile` is used as the dummy device id.
 * Write to `charFile` with: `echo id > /tmp/dummy`
 */
export default class Dummy {
  constructor(send, charFile) {
    this.send = send;
    this.ids = {};

    fs.open(charFile, 'r', (err, fd) => {
      const watcher = chokidar.watch(charFile);
      watcher.on('change', () => {
        const { size } = fs.fstatSync(fd);
        const buffer = Buffer.alloc(size);
        fs.readSync(fd, buffer, 0, size, 0);
        let deviceId = buffer.toString('utf8', 0, size);

        // trim whitespace (trailing newline)
        deviceId = deviceId.replace(/(^\s+|\s+$)/g, '');
        console.log(`dummy button press: '${deviceId}'`);
        this.ids[deviceId] = true;

        // send button press and release
        const payload = { deviceType: 'dummy', deviceId, pressed: true };
        send(PRESS, payload);
        setTimeout(() => {
          send(PRESS, Object.assign(payload, { pressed: false }));
        }, 200);
      });
    });
  }

  requestBatteryLevel() {
    Object.keys(this.ids).forEach((deviceId) => {
      const payload = { deviceType: 'dummy', deviceId, level: Math.random() };
      this.send(BATTERY_RESPONSE, payload);
    });
  }
}
