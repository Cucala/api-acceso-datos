/* eslint-disable global-require */
function router(app) {
  app.use('/upload', require('./uploadingRoutes'));
  app.use('/tipojuego', require('./gameTypeRoutes'));
  app.use('/tipolibro', require('./bookTypeRoutes'));
  app.use('/libro', require('./bookRoutes'));
  app.use('/prestado', require('./borrowedRoutes'));
  app.use('/deseado', require('./wantedRoutes'));
  app.use('/direccion', require('./directionRoutes'));
  app.use('/', require('./startRoutes'));
}

module.exports = router;
