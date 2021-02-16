/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const fs = require('fs');
const saltedMd5 = require('salted-md5');
const path = require('path');
const send = require('../utils/response');
const writeLog = require('../utils/log').write;

const filePath = path.resolve(__dirname, '../../data/keys/key-secret.json');

function index(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let ok = false;
  fs.readFile(filePath, (err, data) => {
    if (err) send.response404(response);
    const secret = JSON.parse(data);
    secret.forEach((element) => {
      if (element.secret === request.headers.client_secret) {
        ok = true;
        send.response200(response, { client: element.client });
      }
    });
    if (!ok) {
      send.response404(response);
    }
  });
}

/* function show(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
} */

function store(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  fs.readFile(filePath, (err, data) => {
    if (err) send.response404(response);
    const secret = JSON.parse(data);
    const newSecret = {
      client: request.body.cliente,
      secret: saltedMd5(`${request.body.cliente}+accesodatos`, request.body.palabra),
      palabra: request.body.palabra,
    };
    secret.push(newSecret);
    fs.writeFile(filePath, JSON.stringify(secret), (err2) => {
      if (err2) send.response304(response);
      send.response200(response, { key: newSecret.secret });
    });
  });
}

/* function update(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function updateForce(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
} */

function destroy(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  fs.readFile(filePath, (err, data) => {
    if (err) send.response404(response);
    const secret = JSON.parse(data);
    let ok = false;
    secret.forEach((element) => {
      if (element.secret === request.headers.client_secret
        && element.palabra === request.body.palabra) {
        ok = true;
        const i = secret.indexOf(element);
        // eslint-disable-next-line no-unused-expressions
        i !== -1 && secret.splice(i, 1);
      }
    });
    if (!ok) {
      send.response404(response);
    } else {
      fs.writeFile(filePath, JSON.stringify(secret), (err2) => {
        if (err2) send.response304(response);
        send.response200(response, { mensaje: 'Cliente eliminado' });
      });
    }
  });
}

module.exports = {
  index: (request, response) => index(request, response),
  // show: (request, response) => show(request, response),
  store: (request, response) => store(request, response),
  // update: (request, response) => update(request, response),
  // updateForce: (request, response) => updateForce(request, response),
  destroy: (request, response) => destroy(request, response),
  head: (request, response) => { response.status(404).send({}); },
};
