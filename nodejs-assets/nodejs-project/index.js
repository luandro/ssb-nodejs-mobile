const express = require('express')
const ssbKeys = require('ssb-keys')
const fs = require('fs')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
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

app.get('/keys', (req, res) => {
  res.json(config.keys)
})

app.get('/path', (req, res) => {
  res.json(config.path)
})

app.listen(3000)
