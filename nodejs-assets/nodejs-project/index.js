const rn_bridge = require('rn-bridge')
const ssbKeys = require('ssb-keys')
const fs = require('fs')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
const manifest = require('./manifest')

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

rn_bridge.channel.on('message', (msg) => {
  if( msg === 'keys') {
    rn_bridge.channel.send(config.keys)
  }
  if( msg === 'path') {
    rn_bridge.channel.send(config.path)
  }
})

rn_bridge.channel.send("Node was initialized.")