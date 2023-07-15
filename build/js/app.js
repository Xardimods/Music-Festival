document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});


function iniciarApp () {
    crearGaleria();
};

function crearGaleria () {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galería Festival">`

        imagen.onclick = function () {
            mostrar_imagen(i);
        }

        galeria.appendChild(imagen);
    };
};

function mostrar_imagen (id) {
    // Insertando las imágenes iteradas con el for 
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galería Festival">`

    // Overlay para superponer en la página web. 
    const overlay =  document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Botón para cerrar el modal
    const cerrar_modal = document.createElement('p');
    cerrar_modal.textContent = 'X'; 
    cerrar_modal.classList.add('btn-cerrar');
    cerrar_modal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrar_modal);

    // Añadiendo el overlay al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
};