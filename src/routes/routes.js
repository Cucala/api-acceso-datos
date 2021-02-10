/* eslint-disable global-require */
function router(app) {
  app.use('/upload', require('./fileRoutes'));
  app.use('/tipojuego', require('./tipoJuegoRoutes'));
  app.use('/tipolibro', require('./tipoLibroRoutes'));
  app.use('/libro', require('./libroRoutes'));
  app.use('/prestado', require('./prestadoRoutes'));
  app.use('/deseado', require('./deseadoRoutes'));
  app.use('/direccion', require('./direccionRoutes'));
  app.use('/', require('./inicioRoutes'));
}

module.exports = router;
