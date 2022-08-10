"use strict";

var validator = require("validator");
const article = require("../models/article");
var Article = require("../models/article");

var fs = require("fs");
var path = require("path");

var controller = {
    datosCurso: (req, res) => {
        //console.log('Hola mundo')
        var hola = req.body.hola;

        return res.status(200).send({
            curso: "Master en Frameworks",
            autor: "Victor Robles",
            url: "github.com/victorrobles",
            hola,
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "Accion test de controlador",
        });
    },

    save: (req, res) => {
        //recolectar parametros por post
        var params = req.body;
        console.log(params);

        //validar datos con validator
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos por enviar",
            });
        }

        if (validate_title && validate_content) {
            //crear objeto a guardar
            var article = new Article();
            //asignar valores a obj
            article.title = params.title;
            article.content = params.content;

            if(params.image){
                article.image = params.image;
            }else{
                article.image = null;
            }
            

            //guardar articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: "error",
                        message: "Articulo no guardado",
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        article: articleStored,
                    });
                }
            });
            //devolver respuesta
        } else {
            return res.status(200).send({
                status: "error",
                message: "Datos no validos",
            });
        }
    },

    getArticles: (req, res) => {
        //find para obtener datos de mongo

        var query = Article.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }

        query.sort("-_id").exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error al obtener articulos",
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay articulos",
                });
            }

            return res.status(200).send({
                status: "success",
                articles,
            });
        });
    },

    //obtener articulo por id

    getArticle: (req, res) => {
        //obtener parametro
        var articleId = req.params.id;

        if (!article || articleId == null) {
            return res.status(404).send({
                status: "error",
                message: "Id de articulo no recibido",
            });
        }

        //buscar articulo

        Article.findById(articleId, (err, article) => {
            if (err || !article) {
                return res.status(404).send({
                    status: "error",
                    message: "Articulo no encontrado",
                });
            }

            return res.status(200).send({
                status: "success",
                article,
            });
        });
    },

    update: (req, res) => {
        //recoger datos por url
        var articleId = req.params.id;

        //recoger datos por put
        var params = req.body;

        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(403).send({
                status: "error",
                message: "faltan parametros",
            });
        }

        if (validate_title && validate_content) {
            //find and update
            Article.findOneAndUpdate(
                { _id: articleId },
                params,
                { new: true },
                (err, articleUpdated) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: "Error al actualizar",
                        });
                    }

                    if (!articleUpdated) {
                        return res.status(200).send({
                            status: "error",
                            message: "No existe articulo",
                        });
                    }

                    return res.status(200).send({
                        status: "success",
                        article: articleUpdated,
                    });
                }
            );
        } else {
            return res.status(200).send({
                status: "error",
                message: "validacion incorrecta",
            });
        }
    },

    delete: (req, res) => {
        //recoger id
        var articleId = req.params.id;

        //find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Srror al borrar",
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: "error",
                    message: "Articulo No borrado o no existe",
                });
            }

            return res.status(200).send({
                status: "success",
                article: articleRemoved,
            });
        });
    },

    upload: (req, res) => {
        //configurar multiparty para la carga de archivos router/article.js
        //linea 9,10, 23
        //recoger fiuchero
        var file_name = "Imagen no subida...";

        if (!req.files) {
            return res.status(404).send({
                status: "error",
                message: file_name,
            });
        }

        console.log(req.files);
        //recoger nombre y extension de archivo
        var file_path = req.files.file0.path;

        var file_split = file_path.split("\\");

        //* advertencia en linux o max

        //        var file_split = file_path.split('/');

        var file_name = file_split[2];

        //comprobar extension (solo img else borrar fichero)
        var extension_split = file_name.split(".");
        var file_ext = extension_split[1];

        //si es valido

        if (
            file_ext != "png" &&
            file_ext != "jpg" &&
            file_ext != "jpeg" &&
            file_ext != "gif"
        ) {
            //borrar archivo
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: "error",
                    message: "Extension de imagen no valida",
                });
            });
        } else {
            //buscar articulo y asignar nombre de imagen
            //obtener id del url
            var articleId = req.params.id;

            if(articleId){
                Article.findOneAndUpdate(
                    { _id: articleId },
                    { image: file_name },
                    { new: true },
                    (err, articleUpdated) => {
                        if (err || !articleUpdated) {
                            //borrar archivo para evitar sobre carga
                            /*fs.unlink(file_path, (err) =>{
                                                    return res.status(200).send({
                                                        status: "error",
                                                        message:'Extension de imagen no valida'
                                                    });
                                                });*/
    
                            return res.status(200).send({
                                status: "error",
                                message: "Error al actualizar imagen",
                            });
                        }
    
                        return res.status(200).send({
                            status: "success",
                            article: articleUpdated,
                        });
                    }
                );
            }
            else{
                return res.status(200).send({
                    status: "success",
                    image:file_name
                });
            }
            
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = "./upload/articles/" + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "imagen no existe",
                });
            }
        });
    },

    search: (req, res) => {
        var searchString = req.params.search;

        //find or
        Article.find({
            $or: [
                { title: { $regex: searchString, $options: "i" } },
                { content: { $regex: searchString, $options: "i" } },
            ],
        })
            .sort([["date", "descending"]])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",

                        message: "Error en la peticion",
                    });
                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: "error",

                        message: "No hay articulos a mostrar",
                    });
                }

                return res.status(200).send({
                    status: "success",
                    articles,
                });
            });
    },
};

module.exports = controller;
