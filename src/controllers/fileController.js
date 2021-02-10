/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const saltedMd5 = require('salted-md5');
const fs = require('fs');
const path = require('path');
const send = require('../utils/response');
const { write } = require('../utils/log');

const bucket = admin.storage().bucket();
const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
};

function index(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function show(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const file = bucket.file(request.params.id);
  let type = request.params.id.split('.')[1];
  const localFilename = `../../data/image.${type}`;
  type = mime[type] || 'text/plain';
  file.createReadStream().on('error',
    (err) => {
      // eslint-disable-next-line no-console
      console.error(`Entra en error: -> ${err}`);
    })
    .on('response', (res) => {
      response.setHeader('Content-Type', type);
      // eslint-disable-next-line no-console
      console.log(`Entra en response: -> ${res}`);
    })
    .on('end', () => {
      send.response200(response, { end: 'ok' });
    })
    .pipe(fs.createWriteStream(localFilename));
}

async function store(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const name = saltedMd5(request.file.originalname, 'SUPER-S@LT!');
  const fileName = name + path.extname(request.file.originalname);
  await bucket.file(fileName).createWriteStream().end(request.file.buffer);
  send.response200(response, { imgNombre: fileName });
}

function update(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function updateForce(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function destroy(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
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
