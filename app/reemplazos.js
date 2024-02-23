const codigosViejos = [
    1013890,
    1013939,
    1013940,
    1013928,
    1013083,
    1012802,
    1013899,
    1013898,
    1013896,
    1013895,
    1013893,
    1013892];

const codigosNuevos = [
    1014336,
    1014322,
    1014323,
    1014353,
    1014219,
    1014324,
    1014253,
    1014253,
    1014251,
    1014250,
    1014249,
    1014248];


async function reemplazo(lista, info) {
    console.log("mensajes: " + info)

    for (let i = 0; i < lista.length; i++) {
        for (let j = 0; j < codigosViejos.length; j++) {
            if (lista[i] === codigosViejos[j]) {
                lista[i] = codigosNuevos[j];
                info.push("El código " + codigosViejos[j] +
                " se reemplazó por el: " + codigosNuevos[j]);
            }
        }
    }
    
    console.log("Paso 2 en reemplazo: " + info)
}

module.exports = {
    reemplazo
}