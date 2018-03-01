[![Build Status](https://travis-ci.org/ftes/clickr-server.svg?branch=master)](https://travis-ci.org/ftes/clickr-server)
[![Coverage Status](https://coveralls.io/repos/github/ftes/clickr-server/badge.svg?branch=master)](https://coveralls.io/github/ftes/clickr-server?branch=master)

# Productive deployment

0. checkout release branch
1. install dependencies
  1. `git submodule init; git submodule update`
  2. `npm install --production`
2. download clients
  1. `npm run add-clients`
3. setup service
  1. `sudo npm install -g pm2`
  2. `sudo PORT=80 pm2 start index.js`
  3. check [teacher](http://localhost/teacher) and [whiteboard](http://localhost/whiteboard) clients
  4. `sudo pm2 startup systemd`
  5. `sudo pm2 save`
  6. change `public/settings.json` (custom pin and server URL)
4. autostart browser
  1. `echo 'chromium-browser --kiosk http://localhost/whiteboard' >> .bashrc`
  or
  Midori won't work (problem with webpack -> undefined functions)
  `sudo systemctl set-default multi-user.target`
  `/lib/systemd/system/getty@.service`: `ExecStart=-/sbin/agetty --noclear -a root %I $TERM`
  `apt install matchbox x11-xserver-utils unclutter`
```
#!/bin/sh
(cd clickr/server && git pull && npm run add-clients) &
URL=http://localhost/whiteboard
unclutter &
matchbox-window-manager & :
xset -dpms
xset s off
while true; do
# incognito: hide "restore last session" popup
chromium-browser --kiosk --incognito $URL
done
```
  - `echo 'xinit /home/pi/whiteboard.sh >> ~/.profile'
