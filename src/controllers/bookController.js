/* eslint-disable no-unused-vars */
const admin = require('firebase-admin');
const send = require('../utils/response');
const { write } = require('../utils/log');
const LibroModel = require('../models/BookModel');
const TipoMonedaModel = require('../models/CoinModel');
const TipoLibroModel = require('../models/BookTypeModel');

const dbFS = admin.firestore();
const dbFSLibro = dbFS.collection('Libro');

async function index(request, response) {
  const filtro = {
    db: request.query.db,
  };
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  const libros = [];
  await dbFSLibro.get().then(
    (libroSnapshot) => {
      libroSnapshot.forEach(
        (libroDoc) => {
          const libroData = libroDoc.data();
          libroData.tipoMoneda.get().then(
            (tipoMonedaDoc) => {
              const tipoMonedaData = tipoMonedaDoc.data();
              const tipoDeMoneda = new TipoMonedaModel(
                tipoMonedaDoc.id,
                tipoMonedaData.nombre,
                tipoMonedaData.simbolo,
              );
              const tiposDeLibroPromesa = [];
              libroData.tipoLibro.forEach(
                (tipoLibroSnapshot) => {
                  tiposDeLibroPromesa.push(
                    tipoLibroSnapshot.get().then(
                      (tipoLibroDoc) => {
                        const tipoLibroData = tipoLibroDoc.data();
                        return new TipoLibroModel(
                          tipoLibroDoc.id,
                          tipoLibroData.nombre,
                          tipoLibroData.descripcion,
                          tipoLibroData.habilitado,
                        );
                      },
                    ),
                  );
                },
              );
              Promise.all(tiposDeLibroPromesa).then(
                (tiposDeLibro) => {
                  libros.push(
                    new LibroModel(
                      libroDoc.id,
                      libroData.nombre,
                      libroData.editorial,
                      libroData.precio,
                      tiposDeLibro,
                      libroData.idioma,
                      libroData.img,
                      libroData.isbn,
                      libroData.num_paginas,
                      libroData.resumen,
                      tipoDeMoneda,
                    ),
                  );
                  send.response200(response, libros);
                },
              ).catch(
                () => {
                  send.response404(response);
                },
              );
            },
          ).catch(
            (error) => {
              write(error);
              send.response404(response);
            },
          );
        },
      );
    },
  ).catch(
    (error) => {
      write(error);
      send.response404(response);
    },
  );
}

function show(request, response) {
  write(`${request.method} -> ${request.originalUrl} | ${request.ip}`);
  dbFSLibro.doc(request.params.id).get().then(
    (libroDoc) => {
      const libroData = libroDoc.data();
      libroData.tipoMoneda.get().then(
        (tipoMonedaDoc) => {
          const tipoMonedaData = tipoMonedaDoc.data();
          const tipoDeMoneda = new TipoMonedaModel(
            tipoMonedaDoc.id,
            tipoMonedaData.nombre,
            tipoMonedaData.simbolo,
          );
          const tiposDeLibroPromesa = [];
          libroData.tipoLibro.forEach(
            (tipoLibroSnapshot) => {
              tiposDeLibroPromesa.push(
                tipoLibroSnapshot.get().then(
                  (tipoLibroDoc) => {
                    const tipoLibroData = tipoLibroDoc.data();
                    return new TipoLibroModel(
                      tipoLibroDoc.id,
                      tipoLibroData.nombre,
                      tipoLibroData.descripcion,
                      tipoLibroData.habilitado,
                    );
                  },
                ),
              );
            },
          );
          let libro;
          Promise.all(tiposDeLibroPromesa).then(
            (tiposDeLibro) => {
              libro = new LibroModel(
                libroDoc.id,
                libroData.nombre,
                libroData.editorial,
                libroData.precio,
                tiposDeLibro,
                libroData.idioma,
                libroData.img,
                libroData.isbn,
                libroData.num_paginas,
                libroData.resumen,
                tipoDeMoneda,
              );
              send.response200(response, libro);
            },
          ).catch(
            () => {
              send.response404(response);
            },
          );
        },
      ).catch(
        (error) => {
          write(error);
          send.response404(response);
        },
      );
    },
  );
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
