#!/bin/sh
(cd teacher; npm run build)
rm -rf server/public/teacher
cp -r teacher/build server/public/teacher