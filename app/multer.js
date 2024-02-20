const multer = require('multer');

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './codigos');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const subir = multer({storage: almacenamiento});

module.exports = {
    subir
}