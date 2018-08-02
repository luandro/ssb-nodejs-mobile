const express = require('express')
const ssbKeys = require('ssb-keys')
const fs = require('fs')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
const manifest = require('./manifest')
const app = express()

// Hack until appDataDir plugin comes out
let  writablePath = path.join(__dirname, '..');
// iOS
if (process.platform==='ios') {
  writablePath = path.join(os.homedir(), 'Documents')
}

const ssbPath = path.resolve(writablePath, '.ssb');
if (!fs.existsSync(ssbPath)) {
  mkdirp.sync(ssbPath);
}

const keys = ssbKeys.loadOrCreateSync(path.join(ssbPath, '/secret'));
const config = require('ssb-config/inject')();
config.path = ssbPath;
config.keys = keys;
config.manifest = manifest;

const startSsbServer = () => new Promise((resolve, reject) => {
  console.log('Starting SSB SERVER')
  const sbot = require('scuttlebot/index')
    .use(require('scuttlebot/plugins/plugins'))
    .use(require('scuttlebot/plugins/master'))
    .use(require('scuttlebot/plugins/replicate'))
    .call(null, config)
  resolve(sbot)
})

startSsbServer()
  .then(sbot => {
    app.get('/whoami', (req, res) => {
      sbot.whoami((err, info) => {
        res.json(info.id)
      })
    })
    app.get('/path', (req, res) => {
      res.json(config.path)
    })
    app.listen(3000)
  })
  .catch(err => console.log('Error on server', err))