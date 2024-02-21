const express = require('express');
const path = require('path');
const fs = require('fs');
const { subir } = require('./multer');
const { lecturaExcel, escrituraExcel } = require('./excel');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("pages");
});

router.get('/download/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const rutaInterna = path.join(__dirname, '..', 'codigos', nombre);
    const nombreOriginal = (nombre.split('_')[0] + ".xlsx");
    const rutaOriginal = path.join(__dirname, '..', 'codigos', nombreOriginal);

    console.log("Descarga")

    fs.access(rutaInterna, fs.constants.F_OK, (err) => {
        if (err) {
            res.send("El archivo no existe");
        }

        res.download(rutaInterna, (err) => {
            if (err) {
                res.send("Error al descargar el archivo");
            }
        })

        res.on('close', () => {
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
        })
    })

})

router.post('/upload', subir.single('ingreso'), async (req, res) => {
    const nombre = (req.file.filename).split('.')[0];
    const ruta = path.join(__dirname, '..', 'codigos', req.file.filename);
    console.log(ruta);
    console.log(subir);
    try {
        await lecturaExcel(ruta);
        console.log("Leido")
        await escrituraExcel(nombre);
        console.log("Escrito")
        res.redirect(`/download/${nombre}_ED.xlsx`);
    } catch (error) {
        throw new Error("Error en la subida" + error)
    }
});


module.exports = {
    router
}