const admin = require('firebase-admin');
const send = require('../utils/response');
const { write } = require('../utils/log');
const TipoLibroModel = require('../models/TipoLibroModel');

const dbFS = admin.firestore();
const dbRtD = admin.database();
const dbFSTipoLibro = dbFS.collection('TipoLibro');
const dbRtDTipoLibro = dbRtD.ref('tipolibro');

async function index(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const tiposDeLibro = [];
  if (request.query.db === 'rtd') {
    await dbRtDTipoLibro.once('value', (snapshot) => {
      snapshot.forEach((child) => {
        const data = child.val();
        tiposDeLibro.push(
          new TipoLibroModel(
            child.key,
            data.nombre,
            data.descripcion,
            data.habilitado,
          ),
        );
      });
    });
  } else {
    const snapshot = await dbFSTipoLibro.get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      tiposDeLibro.push(
        new TipoLibroModel(
          doc.id,
          data.nombre,
          data.descripcion,
          data.habilitado,
        ),
      );
    });
  }
  if (tiposDeLibro.length > 1) {
    send.response200(response, tiposDeLibro);
  } else {
    send.response404(response);
  }
}

async function show(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let tipoLibroModel;
  if (request.query.db === 'rtd') {
    dbRtDTipoLibro.child(request.params.id).on('value', (child) => {
      const data = child.val();
      if (data) {
        tipoLibroModel = new TipoLibroModel(
          child.key,
          data.nombre,
          data.descripcion,
          data.habilitado,
        );
        send.response200(response, tipoLibroModel);
      } else {
        send.response404(response);
      }
    });
  } else {
    const doc = await dbFSTipoLibro.doc(request.params.id).get();
    if (doc.exists) {
      const data = doc.data();
      tipoLibroModel = new TipoLibroModel(
        doc.id,
        data.nombre,
        data.descripcion,
        data.habilitado,
      );
      send.response200(response, tipoLibroModel);
    } else {
      send.response404(response);
    }
  }
}

async function store(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let msg;
  if (request.query.db === 'rtd') {
    msg = await dbRtDTipoLibro.push(request.body);
  } else {
    msg = await dbFSTipoLibro.doc().set(request.body);
  }
  if (!msg) {
    send.response304(response);
  } else {
    send.response201(response, msg);
  }
}

async function update(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let msg;
  if (request.query.db === 'rtd') {
    msg = await dbRtDTipoLibro.child(request.params.id);
    msg.update(request.body);
  } else {
    msg = await dbFSTipoLibro
      .doc(request.params.id)
      .set(request.body, { merge: true });
  }
  if (!msg) {
    send.response304(response);
  } else {
    send.response200(response, msg);
  }
}

async function updateForce(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let msg;
  if (request.query.db === 'rtd') {
    msg = await dbRtDTipoLibro.child(request.params.id);
    msg.set(request.body);
  } else {
    msg = await dbFSTipoLibro.doc(request.params.id).set(request.body);
  }
  if (!msg) {
    send.response304(response);
  } else {
    send.response200(response, msg);
  }
}

async function destroy(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  let msg;
  if (request.query.db === 'rtd') {
    msg = await dbRtDTipoLibro.child(request.params.id);
    msg.remove();
  } else {
    msg = await dbFSTipoLibro.doc(request.params.id).delete();
  }
  if (!msg) {
    send.response304(response);
  } else {
    send.response200(response, msg);
  }
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
