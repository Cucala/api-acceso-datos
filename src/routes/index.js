/* eslint-disable global-require */
function router(app) {
  app.use('/subir', require('./src/uploadingRoutes'));
  app.use('/juego', require('./src/gameRoutes'));
  app.use('/tipojuego', require('./src/gameTypeRoutes'));
  app.use('/tipolibro', require('./src/bookTypeRoutes'));
  app.use('/libro', require('./src/bookRoutes'));
  app.use('/prestado', require('./src/borrowedRoutes'));
  app.use('/deseado', require('./src/wantedRoutes'));
  app.use('/direccion', require('./src/directionRoutes'));
  app.use('/', require('./src/startRoutes'));
}

module.exports = router;
