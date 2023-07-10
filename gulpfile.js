const {src, dest, watch} = require("gulp"); // require es un metodo que extrae un paquete, librería o framework
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

// function tarea (done) {
//     console.log('Mi primera tarea.');

//     done(); // Función de Callback. Es una función que se ejecuta después de otra función.
// }

// exports.tarea = tarea; 

function css (done) {
    src('src/scss/**/*.scss') // Identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass()) // Compilarlo
        .pipe(dest('build/css')); // Almacenarlo en el sistema
        
        // Busca el archivo requerido y luego se usa pipe para ejecutar otra acción, que es llamar una .... funcion? para que se compile. Luego otro pipe para almacenar el código compilado dentro de la carpeta de build. 

    done(); // callback para marcar como hecha una tarea. 
}

function dev (done) {
    watch('src/scss/**/*.scss', css); 
    done(); 
}

exports.css = css; 
exports.dev = dev; 