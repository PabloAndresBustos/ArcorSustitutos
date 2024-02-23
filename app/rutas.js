const express = require('express');
const path = require('path');
const fs = require('fs');
const { subir } = require('./multer');
const { lecturaExcel, escrituraExcel } = require('./excel');

const router = express.Router();

let nombreArchivo = '';
let mensajes = [];

router.get('/', (req, res) => {
    console.log("paso 1 - inicio"+ mensajes)
    res.render("pages", {mensajes : mensajes});
});

router.get('/download', async (req, res) => {
    const nombre = nombreArchivo;
    const rutaInterna = path.join(__dirname, '..', 'codigos', nombre + '_ED.xlsx');
    const rutaOriginal = path.join(__dirname, '..', 'codigos', nombre + '.xlsx');
       
    fs.access(rutaInterna, fs.constants.F_OK, (err) => {

        if (err) {
            res.send("El archivo no existe");
        }

        res.download(rutaInterna, (err) => {
            if (err) {
                res.send("Error al descargar el archivo");
            }

            fs.unlink(rutaInterna, (err) => {
                if (err) {
                    console.error("Error al eliminar el archivo editado");
                } else {
                    console.log("Archivo editado eliminado");
                }
            })
            fs.unlink(rutaOriginal, (err) => {
                if (err) {
                    console.error("Archivo original no eliminado");
                } else {
                    console.log("Archivo original eliminado");
                }
            })
            mensajes = [];
            console.log("Paso 4 - download" + mensajes)
        })
    })
});

router.post('/upload', subir.single('ingreso'), async (req, res) => {
    const nombre = (req.file.filename).split('.')[0];
    const ruta = path.join(__dirname, '..', 'codigos', req.file.filename);
    try {
        await lecturaExcel(ruta);
        await escrituraExcel(nombre, mensajes);
        nombreArchivo = nombre;
        res.render('pages', {mensajes: mensajes});
    } catch (error) {
        throw new Error("Error en la subida" + error)
    }
});

module.exports = {
    router
}