import { parse } from './analizador.js'
import { InterpreterVisitor } from './interprete.js'

const editor = document.getElementById('codeInput')
const btn = document.getElementById('compileButton')
const salida = document.getElementById('compiledOutput')

btn.addEventListener('click', () => {
    const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)

    const interprete = new InterpreterVisitor()

    console.log({ sentencias })
    sentencias.forEach(sentencia => sentencia.accept(interprete))

    console.log("Salida:", interprete.salida)
    salida.textContent = interprete.salida
})
