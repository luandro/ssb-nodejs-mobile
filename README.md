# Scuttlebot on nodejs-mobile

Experimentation for running [scuttlebot](https://github.com/ssbc/scuttlebot) with [nodejs-mobile-react-native](https://github.com/janeasystems/nodejs-mobile-react-native).

## Goals

- proof-of-concept Android :white_check_mark:
- proof-of-concept iOS :x:
- support more native modules (sodium, leveldown, utp-native) :x:

## Usage
```
git clone https://github.com/luandro/ssb-nodejs-mobile.git
cd ssb-nodejs-mobile
npm i
```

Than open the project's `./android` directory in Android Studio in order to download all the necessary dependencies.

Enter the NodeJS project directory and run `npm install` and `npm run prepare` in order to patch necessary packages:
- [leveldown](https://github.com/Level/leveldown/pull/446)

`npm run dev` to start Android development and logging.

Use `adb logcat -s "NODEJS-MOBILE"` to log NodeJS application.

## Fixes that made this possible
- [Scuttlebot fork](https://github.com/luandro/scuttlebot)
- [NodeJS Mobile - name collision error](https://github.com/janeasystems/nodejs-mobile/issues/34#issuecomment-358142287)
- [NodeJS Mobile - folders starting with underscore not copied on Android](https://github.com/janeasystems/nodejs-mobile/issues/60#issuecomment-381288106)
- [Leveldown - compiling for Android x86](https://github.com/Level/leveldown/pull/446)