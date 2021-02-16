/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const send = require('../utils/response');

function autentificarConClientSecret(request, response, next) {
  const filePath = path.resolve(__dirname, '../../data/keys/key-secret.json');
  let ok = false;
  fs.readFile(filePath, (err, data) => {
    if (err) send.response404(response);
    const secret = JSON.parse(data);
    secret.forEach((element) => {
      if (element.secret === request.headers.client_secret) {
        ok = true;
      }
    });
    if (!ok) {
      send.response401(response);
    } else {
      next();
    }
  });
}

module.exports = {
  clientSecret: (request, response, next) => autentificarConClientSecret(request, response, next),
};
