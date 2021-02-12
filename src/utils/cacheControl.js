const fs = require('fs');

function obtenerPesoArchivosMegaBytes(rutaAchivo) {
  const peso = fs.statSync(rutaAchivo).size;
  return peso / 1000000.0;
}

function haSidoUsadoHaceMenosDeUnaSemana(rutaAchivo, tiempoActual) {
  const ultimoAccesoAlArchivo = fs.statSync(rutaAchivo).atimeMs;
  const tiempoHaceUnaSemana = tiempoActual - 604800;
  if (ultimoAccesoAlArchivo >= tiempoHaceUnaSemana) {
    return true;
  }
  return false;
}

function limpiarArchivosEnCacheSi(directorio, maxTamanyoCache) {
  const tiempoActual = new Date().getTime();
  fs.readdir(directorio, (err, files) => {
    let pesoTotalArchivosEnCache = 0;
    if (err) throw err;
    files.forEach((file) => {
      pesoTotalArchivosEnCache += obtenerPesoArchivosMegaBytes(`${directorio}\\${file}`);
    });
    if (pesoTotalArchivosEnCache > maxTamanyoCache) {
      files.forEach((file) => {
        if (!haSidoUsadoHaceMenosDeUnaSemana(`${directorio}\\${file}`, tiempoActual)) {
          fs.unlinkSync(`${directorio}\\${file}`);
        }
      });
    }
  });
}

module.exports = {
  // eslint-disable-next-line max-len
  limpiarArchivosEnCacheSi: (directorio, maxTamanyoCache) => limpiarArchivosEnCacheSi(directorio, maxTamanyoCache),
};
