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
  const config = {
    action: 'read',
    expires: '03-17-2025',
  };
  /* file.getSignedUrl(config, (err, url) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      send.response404(response);
      return;
    }
    send.response200(response, { img: url });
  }); */
  file.download({
    destination: 'C:\\Users\\elcuc\\OneDrive\\Proyectos\\Node\\api-acceso-datos\\data\\image.png',
  }).then((data) => {
    const contents = data[0];
    console.log(contents);
    response.sendFile('C:\\Users\\elcuc\\OneDrive\\Proyectos\\Node\\api-acceso-datos\\data\\image.png');
  }).catch((err) => {
    console.log(err);
    send.response404(response);
  });
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