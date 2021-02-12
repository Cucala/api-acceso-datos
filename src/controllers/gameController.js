/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const send = require('../utils/response');
const writeLog = require('../utils/log').write;

const uriLocal = 'mongodb://localhost/patatasimon';
const uriAtlas = 'mongodb+srv://patatasimon:2321patata@cluster0.9g3l6.mongodb.net/?retryWrites=true&w=majority';
const { Schema } = mongoose;

const TipoJuegoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  nombre: Schema.Types.String,
  habilitado: Schema.Types.Boolean,
}, { collection: 'tipojuego' });

const JuegoMongoose = mongoose.model('Juego', TipoJuegoSchema);

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
  const filter = {};
  connect();
  JuegoMongoose.find(filter).then(
    (res) => send.response200(response, res),
  ).finally(
    () => close(),
  );
}

async function show(request, response) {
  writeLog(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const filter = {
    _id: new ObjectId(request.params.id),
  };
  connect();
  JuegoMongoose.findOne(filter).then(
    (res) => response.json(res),
  ).finally(
    () => close(),
  );
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
