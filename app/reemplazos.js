let { codigosIngreso } = require("./excel");

const codigosViejos = [
    1013890,
    1013939,
    1013940,
    1013928,
    1013083,
    1012802];

const codigosNuevos = [
    1014336,
    1014322,
    1014323,
    1014353,
    1014219,
    1014324];

const mensajesReemplazo = [];

async function reemplazo() {
    for (let i = 0; i < codigosIngreso.length; i++) {
        for (let j = 0; j < codigosViejos.length; j++) {
            if (codigosIngreso[i] === codigosViejos[j]) {
                mensajesReemplazo.push("El código " + codigosViejos[j] +
                    " se reemplazó por el: " + codigosNuevos[j] +
                    " en la lista ingresada");
                codigosIngreso[i] = codigosNuevos[j];
            }
        }
    }
}


module.exports = {
    reemplazo,
    mensajesReemplazo
}





