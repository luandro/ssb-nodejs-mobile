# Scuttlebot on nodejs-mobile

Experimentation for running [scuttlebot](https://github.com/ssbc/scuttlebot) with [nodejs-mobile-react-native](https://github.com/janeasystems/nodejs-mobile-react-native).

## Goals

- proof-of-concept Android :check:
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

## Requires
- [scuttlebot fork](https://github.com/luandro/scuttlebot)