const excel = require('xlsx-populate');

const codigosIngreso = [];
const cantidades = [];

async function lecturaExcel(archivo) {

    try {
        //leemos el archivo Ecxel a comprobar
        const libro = await excel.fromFileAsync(archivo);
        //Buscamos en la hoja 1 
        const hoja = libro.sheet(0);
        //Buscamos cual es la cantidad de filas usadas
        const ultimaCelda = hoja.usedRange().endCell().rowNumber();
        //leemos los codigos ingresados
        const codigosIngresados = await hoja.range(`A1:A${ultimaCelda}`).value();
        //leemos las cantidades ingresadas
        const cantidadesIngresadas = await hoja.range(`B1:B${ultimaCelda}`).value();

        //Reducimos la [[]] a una lista con los codigos
        const codigos = await codigosIngresados.reduce((acc, lista) => {
            return acc.concat(lista);
        }, []);
        //Reducimos la [[]] a una lista con las cantidades
        const ingresoCantidades = await cantidadesIngresadas.reduce((acc, lista) => {
            return acc.concat(lista);
        }, []);

        //Agregamos los valores a nuesta lista
        codigos.forEach((elementos) => {
            codigosIngreso.push(elementos);
        })
        //Agregamos los valores a nuesta lista
        ingresoCantidades.forEach((elementos) => {
            cantidades.push(elementos);
        })

    } catch (error) {
        throw new Error("Error al leer el archivo" + error);
    }

}

async function escrituraExcel(elementos, nombre) {

    try {
        const libro = await excel.fromBlankAsync();
        for (i = 0; i < elementos.length; i++) {
            libro.sheet(0).cell("A" + `${i + 1}`).value(elementos[i]);
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

