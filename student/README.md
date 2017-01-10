# Student Client
Hybrid web app: Web app built with React, converted to native app with Cordova.

## Prerequisites
- yarn (npm)
- imagemagick (to generate icon)

## Installation
`yarn install`

## Build
- react only: `yarn run build`
- cordova: `yarn run build-cordova`

## Run
- react only: `yarn start`
- cordova: `yarn run start-cordova`

## Release
- edit `build.json`: add `password` and `storePassword`
- `npm run build-cordova-release`

## Layout
### React
- node_modules
- public
- src
- package.json
- yarn.lock

### Cordova
- hooks
- platforms
- plugins
- www

## Build
1. react app is built
2. react app is copied into `./www` (cordova expects web root here)
