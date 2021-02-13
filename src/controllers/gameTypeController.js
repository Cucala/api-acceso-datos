/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const TipoJuegoModel = require('../models/GameTypeModel');
const send = require('../utils/response');
const writeLog = require('../utils/log').write;
const keyMongodbAtlas = require('../../data/keys/key-mongodb.json');

const uriLocal = 'mongodb://localhost/patatasimon';
const uriAtlas = `mongodb+srv://${keyMongodbAtlas.user}:${keyMongodbAtlas.password}@${keyMongodbAtlas.cluster}/?retryWrites=true&w=majority;`;
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
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  if (request.query.db === 'driver') {
    const filter = {};
    const client = await MongoClient.connect(uriLocal,
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
    ).catch(
      () => send.response304(response),
    ).finally(
      () => close(),
    );
  }
}

async function show(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  if (request.query.db === 'driver') {
    MongoClient.connect(uriAtlas,
      { useNewUrlParser: true, useUnifiedTopology: true }).then(
      (client) => {
        const db = client.db('patatasimon');
        db.collection('tipojuego').findOne(filter).then(
          (doc) => {
            const tipoJuego = new TipoJuegoModel(
              // eslint-disable-next-line no-underscore-dangle
              doc._id,
              doc.nombre,
              doc.descripcion,
              doc.habilitado,
            );
            send.response200(response, tipoJuego);
            client.close();
          },
        ).catch(
          () => send.response404(response),
        );
      },
    ).catch(
      () => send.response404(response),
    );
  } else {
    connect();
    TipoJuegoMongoose.findOne(filter).then(
      (res) => send.response200(response, res),
    ).catch(
      () => send.response304(response),
    ).finally(
      () => close(),
    );
  }
}

function store(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  connect();
  TipoJuegoMongoose.insertMany(request.body).then(
    (res) => send.response200(response, res),
  ).catch(
    () => send.response304(response),
  ).finally(
    () => close(),
  );
}

function update(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  connect();
  TipoJuegoMongoose.updateOne(filter, request.body).then(
    (res) => send.response200(response, res),
  ).catch(
    () => send.response304(response),
  ).finally(
    () => close(),
  );
}

function updateForce(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  connect();
  TipoJuegoMongoose.replaceOne(filter, request.body).then(
    (res) => send.response200(response, res),
  ).catch(
    () => send.response304(response),
  ).finally(
    () => close(),
  );
}

function destroy(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  connect();
  TipoJuegoMongoose.deleteOne(filter).then(
    (res) => send.response200(response, res),
  ).catch(
    () => send.response304(response),
  ).finally(
    () => close(),
  );
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
