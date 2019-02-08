const express = require('express');
const app = express();


const {filtrarEquipos, jugadoresEquipos} = require('./controllers/equipos');

app.set('json spaces',4);

app.get('/countries', filtrarEquipos);

app.get('/countries/:id', jugadoresEquipos);

app.listen(3000, () => {
console.log('server started');
});