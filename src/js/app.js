document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});


function iniciarApp () {
    fijar_navegacion();
    crearGaleria();
    scroll_nav();
};

function fijar_navegacion () {
    const barra = document.querySelector('.header');
    const sobre_festival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function () {

        if (sobre_festival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('fix-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('fix-scroll');
        }
    })
};

function scroll_nav () {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion_scroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccion_scroll);
            seccion.scrollIntoView({behavior: "smooth"});
        })
    })
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