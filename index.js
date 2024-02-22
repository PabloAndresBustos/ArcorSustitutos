require('dotenv').config();
const express = require('express');
const { router } = require('./app/rutas');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use('/', router);

app.listen(process.env.PORT, () => console.log("Escuchando en el puerto: " + process.env.PORT));
