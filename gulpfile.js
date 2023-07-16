const {src, dest, watch, parallel} = require("gulp"); // require es un metodo que extrae un paquete, librería o framework
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// function tarea (done) {
//     console.log('Mi primera tarea.');

//     done(); // Función de Callback. Es una función que se ejecuta después de otra función.
// }

// exports.tarea = tarea; 

// Imágenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


// JavaScript 

const terser =  require('gulp-terser-js');

function css (done) {
    src('src/scss/**/*.scss') // Identificar el archivo de SASS
        .pipe(sourcemaps.init()) // inicia proceso para localizar modificaciones CSS aun teniendo minificacion
        .pipe(plumber()) // evita detencion de proceso si hay errores
        .pipe(sass()) // Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()])) // minificacion
        .pipe(sourcemaps.write('.')) // relocalizacion
        .pipe(dest('build/css')); // Almacenarlo en el sistema
        
        // Busca el archivo requerido y luego se usa pipe para ejecutar otra acción, que es llamar una .... funcion? para que se compile. Luego otro pipe para almacenar el código compilado dentro de la carpeta de build. 

    done(); // callback para marcar como hecha una tarea. 
}

function imagenes (done) {
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    }; // calidad de imagen

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
} // convierte imagenes a formato webp

function versionAvif(done) {
    const opciones = {
        quality: 50
    }; // calidad de imagen

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
} // convierte imagenes a formato webp

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();
} // Lee por los cambios de los archivos de JS

function dev (done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done(); 
} // cambios inmediatos en los archivos de sass

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
// exportaciones 