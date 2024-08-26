import { parse } from './analizador.js';
import { InterpreterVisitor } from './interprete.js';
import { SemanticError } from './transfer.js';

const editor = document.getElementById('codeInput');
const btn = document.getElementById('compileButton');
const salida = document.getElementById('compiledOutput');
const openFileInput = document.getElementById('openFile');

const errores = [];

// Evento para el botón de elegir archivos
openFileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0]; // Tomar el primer archivo seleccionado
        const reader = new FileReader();

        reader.onload = function(e) {
            editor.value = e.target.result; // Cargar el contenido del archivo en el textarea
        };

        reader.readAsText(file); // Leer el archivo como texto
    }
});

const reportButton = document.getElementById('reportButton');
reportButton.addEventListener('click', () => {
    actualizarTablaErrores(); 
});


btn.addEventListener('click', () => {

    const codigoFuente = editor.value;
    errores.length = 0;

    try{
        
    
        const sentencias = parse(codigoFuente);

        const interprete = new InterpreterVisitor();

        console.log({ sentencias });
        sentencias.forEach(sentencia => sentencia.accept(interprete));

        console.log("Salida:", interprete.salida);
        salida.textContent = interprete.salida;
    }catch(e){
        //console.log(JSON.stringify(e,null,2));
        //console.log(e.message);
        

        if(e instanceof SemanticError){
            addError(e.tipo, e.linea, e.columna, e.message);
            salida.textContent = `Error Semántico: ${e.message} en linea: ${e.linea} columna: ${e.columna}`;
        }else{
            const linea = e.location ? e.location.start.line: 'Desconocida';
            const columna = e.location ? e.location.start.column: 'Desconocida';
            salida.textContent = `Error léxico/sintáctico: ${e.message} en linea: ${linea} columna: ${columna}`;
            addError('Léxico/Sintáctico:', linea, columna, e.message);
        }
        
        //console.log(errores);
    }
    
});

function actualizarTablaErrores() {
    const tbody = document.querySelector("#modalErrores tbody");
    tbody.innerHTML = ""; // Limpiar contenido previo de la tabla

    errores.forEach((error, index) => {
        const fila = document.createElement("tr");

        const celdaTipo = document.createElement("td");
        celdaTipo.textContent = error.tipo;
        fila.appendChild(celdaTipo);

        const celdaLinea = document.createElement("td");
        celdaLinea.textContent = error.linea;
        fila.appendChild(celdaLinea);

        const celdaColumna = document.createElement("td");
        celdaColumna.textContent = error.columna;
        fila.appendChild(celdaColumna);

        const celdaDescripcion = document.createElement("td");
        celdaDescripcion.textContent = error.descripcion;
        fila.appendChild(celdaDescripcion);

        tbody.appendChild(fila);
    });
}


export function addError(tipo,linea,columna, descripcion){
    const error = {
        tipo,
        linea,
        columna,
        descripcion
    }
    errores.push(error);
}
