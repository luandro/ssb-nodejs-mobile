# Scuttlebot on nodejs-mobile

Experimentation for running [scuttlebot](https://github.com/ssbc/scuttlebot) with [nodejs-mobile-react-native](https://github.com/janeasystems/nodejs-mobile-react-native).

## Goals

- proof-of-concept Android :x:
- proof-of-concept iOS :x:
- support more native modules (sodium, leveldown, utp-native) :x:

## Usage
```
git clone https://github.com/luandro/ssb-nodejs-mobile.git
cd ssb-nodejs-mobile
npm i
```

Than open the project's `./android` directory in Android Studio in order to download all the necessary dependencies.

`npm run dev` to start development.

Use `adb logcat -s "NODEJS-MOBILE"` to log NodeJS application.