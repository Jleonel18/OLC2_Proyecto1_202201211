import { parse } from './analizador.js';
import { InterpreterVisitor } from './interprete.js';

const editor = document.getElementById('codeInput');
const btn = document.getElementById('compileButton');
const salida = document.getElementById('compiledOutput');
const openFileInput = document.getElementById('openFile');

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

btn.addEventListener('click', () => {
    const codigoFuente = editor.value;
    const sentencias = parse(codigoFuente);

    const interprete = new InterpreterVisitor();

    console.log({ sentencias });
    sentencias.forEach(sentencia => sentencia.accept(interprete));

    console.log("Salida:", interprete.salida);
    salida.textContent = interprete.salida;
});
