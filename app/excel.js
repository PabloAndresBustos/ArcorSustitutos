const excel = require('xlsx-populate');

let codigosIngreso = [];
let cantidades = [];

async function lecturaExcel(archivo) {

    try {
        //leemos el archivo Ecxel a comprobar
        const libro = await excel.fromFileAsync(archivo);
        //Buscamos en la hoja 1 
        const hoja = libro.sheet(0);
        //Buscamos cual es la cantidad de filas usadas
        const ultimaCelda = hoja.usedRange().endCell().rowNumber();
        //leemos los codigos ingresados
        let codigosIngresados = await hoja.range(`A1:A${ultimaCelda}`).value();
        //leemos las cantidades ingresadas
        let cantidadesIngresadas = await hoja.range(`B1:B${ultimaCelda}`).value();

        //Reducimos la [[]] a una lista con los codigos
        codigosIngreso = await codigosIngresados.reduce((acc, lista) => {
            return acc.concat(lista);
        }, []);
        //Reducimos la [[]] a una lista con las cantidades
        cantidades = await cantidadesIngresadas.reduce((acc, lista) => {
            return acc.concat(lista);
        }, []);
    } catch (error) {
        throw new Error("Error al leer el archivo" + error);
    }

}

async function escrituraExcel(nombre) {

    try {
        const libro = await excel.fromBlankAsync();
        for (i = 0; i < codigosIngreso.length; i++) {
            libro.sheet(0).cell("A" + `${i + 1}`).value(codigosIngreso[i]);
            libro.sheet(0).cell("B" + `${i + 1}`).value(cantidades[i]);
        }
        await libro.toFileAsync(`./codigos/${nombre}_ED.xlsx`);
    } catch (error) {
        throw new Error("Error al escribir el nuevo archivo" + error);
    }
}

module.exports = {
    escrituraExcel,
    lecturaExcel,
    codigosIngreso,
    cantidades
}

