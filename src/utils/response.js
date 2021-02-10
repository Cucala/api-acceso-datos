/* eslint-disable object-shorthand */
// ok
function response200(response, data) {
  response.status(200).json({
    status: 'ok',
    data: data,
  });
}
// created
function response201(response, data) {
  response.status(201).json({
    status: 'ok',
    data: data,
  });
}
// Not Modified
function response304(response) {
  response.status(304).json({
    status: 'error',
    data: {
      id: 'Error304',
      name: 'No se ha podido modificar',
    },
  });
}
// Not Found
function response404(response) {
  response.status(404).json({
    status: 'error',
    data: {
      id: 'Error404',
      name: 'No se ha encontrado el documento',
    },
  });
}

module.exports = {
  response200: (response, data) => response200(response, data),
  response201: (response, data) => response201(response, data),
  response304: (response) => response304(response),
  response404: (response) => response404(response),
};
