"use strict";

//cargar modulos de node 4 servidor
var express = require("express");

var bodyparser = require("body-parser");

//ejecutar express http
var app = express();

// cargar  ficheros de rutas

var article_routes = require('./routes/article');

//middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Prefijos de rutas / cargar rutas

app.use('/api',article_routes);


/* Si quisera no manejar controlador o rutas
app.get("/datos-curso", (req, res) => {
    //console.log('Hola mundo')
    var hola = req.body.hola;
    
    return res.status(200).send({
        curso: "Master en Frameworks",
        autor: "Victor Robles",
        url: "github.com/victorrobles",
        hola
    });
});*/

//exportar modulo (fichero actual)
module.exports = app;
