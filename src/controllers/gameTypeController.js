/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const TipoJuegoModel = require('../models/GameTypeModel');
const send = require('../utils/response');
const { write } = require('../utils/log');

const uriLocal = 'mongodb://localhost/patatasimon';
const uriAtlas = 'mongodb+srv://patatasimon:2321patata@cluster0.9g3l6.mongodb.net/?retryWrites=true&w=majority';
const { Schema } = mongoose;

const TipoJuegoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  nombre: Schema.Types.String,
  habilitado: Schema.Types.Boolean,
}, { collection: 'tipojuego' });

const TipoJuegoMongoose = mongoose.model('TipoJuego', TipoJuegoSchema);

function connect() {
  mongoose.connect(uriLocal, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
      console.error('Error al conectar a MongoDB');
    } else {
      console.log('Conectado a MongoDB');
    }
  });
}

function close() {
  mongoose.connection.close();
  console.log('Coneccion cerrada a MongoDB');
}

async function index(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  if (request.query.db === 'driver') {
    const filter = {};
    const client = await MongoClient.connect(uriAtlas,
      { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('patatasimon');
    const items = await db.collection('tipojuego').find(filter);
    const tiposDeJuego = [];
    await items.forEach((doc) => {
      tiposDeJuego.push(
        new TipoJuegoModel(
          // eslint-disable-next-line no-underscore-dangle
          doc._id,
          doc.nombre,
          doc.descripcion,
          doc.habilitado,
        ),
      );
    });
    send.response200(response, tiposDeJuego);
    client.close();
  } else {
    connect();
    TipoJuegoMongoose.find().then(
      (res) => send.response200(response, res),
    ).finally(
      () => close(),
    );
  }
}

async function show(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  if (request.query.db === 'driver') {
    const client = await MongoClient.connect(uriAtlas,
      { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('patatasimon');
    const doc = await db.collection('tipojuego').findOne(filter);
    const tipoJuego = new TipoJuegoModel(
      // eslint-disable-next-line no-underscore-dangle
      doc._id,
      doc.nombre,
      doc.descripcion,
      doc.habilitado,
    );
    send.response200(response, tipoJuego);
    client.close();
  } else {
    connect();
    TipoJuegoMongoose.findOne(filter).then(
      (res) => response.json(res),
    ).finally(
      () => close(),
    );
  }
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