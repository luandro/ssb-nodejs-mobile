const rn_bridge = require('rn-bridge')
const ssbKeys = require('ssb-keys')
const fs = require('fs')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
const manifest = require('./manifest')

const ssbPath = path.resolve(os.homedir(), '.ssb');
if (!fs.existsSync(ssbPath)) {
  mkdirp.sync(ssbPath);
}
const keys = ssbKeys.loadOrCreateSync(path.join(ssbPath, '/secret'));

const config = require('ssb-config/inject')();
config.path = ssbPath;
config.keys = keys;
config.manifest = manifest;

rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(config)
})

rn_bridge.channel.send("Node was initialized.")