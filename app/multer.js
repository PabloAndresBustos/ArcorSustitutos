const multer = require('multer');
const path = require('path');

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        const ruta = path.join(__dirname, '../codigos');
        cb(null, ruta);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const subir = multer({storage: almacenamiento});

module.exports = {
    subir
}