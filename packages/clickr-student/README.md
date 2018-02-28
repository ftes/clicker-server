[![Build Status](https://travis-ci.org/ftes/clickr-student.svg?branch=master)](https://travis-ci.org/ftes/clickr-student)
[![Coverage Status](https://coveralls.io/repos/github/ftes/clickr-student/badge.svg?branch=master)](https://coveralls.io/github/ftes/clickr-student?branch=master)

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
  - make sure to not commit your password (`git update-index --skip-worktree build.json`)
- update version in `config.xml`
  - android version is currently 1 major version before npm version (`1.1.1` instead of `0.1.1`)
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
