/* eslint-disable no-console */
const fs = require('fs');

function readLOG() {
  const log = fs.readFileSync('data/log.txt');
  console.log(log);
}

function writeLOG(message) {
  const stream = fs.createWriteStream('data/log.txt', { flags: 'a' });
  stream.once('open', () => {
    stream.write(`> ${message}\r\n`);
  });
}

module.exports = {
  write: (message) => writeLOG(message),
  read: () => readLOG(),
};
