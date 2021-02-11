/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const saltedMd5 = require('salted-md5');
const fs = require('fs');
const path = require('path');
const send = require('../utils/response');
const writeLog = require('../utils/log').write;

const bucket = admin.storage().bucket();

function index(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function show(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const localPath = `${path.resolve(__dirname, '../../data/temp')}\\${request.params.id}`;
  if (fs.existsSync(localPath)) {
    response.sendFile(localPath);
  } else {
    const file = bucket.file(request.params.id);
    file.download().then((data) => {
      fs.writeFile(localPath, data[0], (err) => {
        if (err) throw err;
        response.sendFile(localPath);
      });
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      send.response404(response);
    });
  }
}

async function store(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const name = saltedMd5(request.file.originalname, 'SUPER-S@LT!');
  const fileName = name + path.extname(request.file.originalname);
  await bucket.file(fileName).createWriteStream().end(request.file.buffer);
  send.response200(response, { imgNombre: fileName });
}

function update(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function updateForce(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function destroy(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

module.exports = {
  index: (request, response) => index(request, response),
  show: (request, response) => show(request, response),
  store: (request, response) => store(request, response),
  update: (request, response) => update(request, response),
  updateForce: (request, response) => updateForce(request, response),
  destroy: (request, response) => destroy(request, response),
  head: (request, response) => { response.status(404).send({}); },
};
