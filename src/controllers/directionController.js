/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const writeLog = require('../utils/log').write;

function index(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function show(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function store(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
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
