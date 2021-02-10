/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const { write } = require('../utils/log');

function index(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function show(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
}

function store(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
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
