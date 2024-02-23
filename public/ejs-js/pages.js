const copiar = document.querySelector('#copy');
const codigos = document.querySelectorAll('p');

copiar.addEventListener('click', () => {
    let contenido = '';
    codigos.forEach((element) => {
        contenido += element.textContent + '\n';
    });

   // Copiar el contenido al portapapeles
    navigator.clipboard.writeText(contenido)
        .then(() => {
            console.log('Contenido copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el contenido: ', err);
        });
});