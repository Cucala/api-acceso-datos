const express = require('express');
const admin = require('firebase-admin');
const compression = require('compression');
const serviceAccount = require('./data/keys/key-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://patata-simon.firebaseio.com',
  storageBucket: 'patata-simon.appspot.com',
});

const app = express();
const PORT = process.env.PORT || 8030;
const HOSTNAME = '127.0.0.1';

app.use(express.json());
app.use(compression());

require('./src/routes')(app);

// eslint-disable-next-line no-console
app.listen(PORT, HOSTNAME, () => console.log(`La Api REST de acceso a datos se ha inicializado en http://${HOSTNAME}:${PORT}!`));
