import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'
import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm'

const editor = document.getElementById('codeInput')
const btn = document.getElementById('compileButton')
const salida = document.getElementById('compiledOutput')

/*const editor = monaco.editor.create(
    document.getElementById('codeInput'), {
    value: '',
    language: 'javascript',
    theme: 'vs-dark'
    },
);*/

btn.addEventListener('click', () => {
    const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)

    const interprete = new InterpreterVisitor()

    console.log({ sentencias })
    sentencias.forEach(sentencia => sentencia.accept(interprete))

    console.log("Salida:", interprete.salida)
    salida.textContent = interprete.salida
})
