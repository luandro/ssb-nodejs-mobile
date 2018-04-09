const express = require('express')
const ssbKeys = require('ssb-keys')
const fs = require('fs')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
const Client = require('ssb-client')
const manifest = require('./manifest')
const app = express()

// Hack until appDataDir plugin comes out
const  writablePath = path.join(__dirname, '..');
// const ssbPath = path.resolve(os.homedir(), '.ssb');
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
  resolve(
    require('scuttlebot/index')
      .use(require('scuttlebot/plugins/plugins'))
      .use(require('scuttlebot/plugins/master'))
      .use(require('scuttlebot/plugins/replicate'))
      .call(null, config)
    )
})

const runSsbClient = (plugins, opts) => new Promise((resolve, reject) => {
  Client(config.keys, config, (err, sbot) => {
    if (err) console.log('SSB CLIENT ERROR', err)
    console.log('Starting SSB CLIENT: ')
    resolve(sbot)
  })
})

startSsbServer()
  .then(() => runSsbClient().then(sbot => {
    
    app.get('/whoami', (req, res) => {
      sbot.whoami((err, info) => {
        res.json(info.id)
      })
    })
    
    app.get('/path', (req, res) => {
      res.json(config.path)
    })
    
    app.listen(3000)
  }))

// require('scuttlebot/index')
//   .use(require('scuttlebot/plugins/plugins'))
//   .use(require('scuttlebot/plugins/master'))
//   .use(require('scuttlebot/plugins/replicate'))
//   .call(null, config)


