/* eslint-disable global-require */
function router(app) {
  app.use('/subir', require('./uploadingRoutes'));
  app.use('/juego', require('./gameRoutes'));
  app.use('/tipojuego', require('./gameTypeRoutes'));
  app.use('/tipolibro', require('./bookTypeRoutes'));
  app.use('/libro', require('./bookRoutes'));
  app.use('/prestado', require('./borrowedRoutes'));
  app.use('/deseado', require('./wantedRoutes'));
  app.use('/direccion', require('./directionRoutes'));
  app.use('/', require('./startRoutes'));
}

module.exports = router;
