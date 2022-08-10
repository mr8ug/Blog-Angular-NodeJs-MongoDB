'use strict'

var mongoose = require('mongoose');

var app = require('./app');

var port = 3900;

//mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/api_rest_blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexion a base de datos correcta');

        //crear servidor

        app.listen(port, () => {
            console.log('Servidor corriendo en http://127.0.0.1:' + port);
        })
    }).catch((err) => {
        console.log('No pudo conectarse!', err);
    });