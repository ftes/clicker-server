## Prerequisites
- imagemagick (to generate icon)

## Cordova
- `yarn start-cordova`
- `yarn build-cordova`

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
