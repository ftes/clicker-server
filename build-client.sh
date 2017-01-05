#!/bin/sh
(cd client; npm run build)
rm -rf server/public/*
cp -r client/build/* server/public
