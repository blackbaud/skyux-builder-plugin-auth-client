/* jshint node: true */

'use strict';

const fs = require('fs-extra');
const path = require('path');

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');

function createDist() {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  fs.writeFileSync(path.join(distPath, 'index.js'), `module.exports = require('./addin-client');`);
}

function makePackageFileForDist() {
  const packageJson = fs.readJSONSync(path.join(rootPath, 'package.json'));

  packageJson.module = 'index.js';

  fs.writeJSONSync(path.join(distPath, 'package.json'), packageJson, { spaces: 2 });
}

function copyFilesToDist() {
  fs.copySync(path.join(rootPath, 'src', 'addin-client.js'), path.join(distPath, 'addin-client.js'));
  fs.copySync(path.join(rootPath, 'README.md'), path.join(distPath, 'README.md'));
  fs.copySync(path.join(rootPath, 'CHANGELOG.md'), path.join(distPath, 'CHANGELOG.md'));
}

createDist();
makePackageFileForDist();
copyFilesToDist();
