
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').OperacionBinaria} OperacionBinaria


 * @typedef {import('./nodos').OperacionUnaria} OperacionUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Primitivo} Primitivo


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').Ternario} Ternario


 * @typedef {import('./nodos').TipoVariable} TipoVariable


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionStmt} ExpresionStmt


 * @typedef {import('./nodos').Asignacion} Asignacion


 * @typedef {import('./nodos').AsignacionArreglo} AsignacionArreglo


 * @typedef {import('./nodos').Bloque} Bloque


 * @typedef {import('./nodos').If} If


 * @typedef {import('./nodos').While} While


 * @typedef {import('./nodos').For} For


 * @typedef {import('./nodos').Switch} Switch


 * @typedef {import('./nodos').Arreglo} Arreglo


 * @typedef {import('./nodos').ArregloVal} ArregloVal


 * @typedef {import('./nodos').ArregloVacio} ArregloVacio


 * @typedef {import('./nodos').CopiarArreglo} CopiarArreglo


 * @typedef {import('./nodos').Break} Break


 * @typedef {import('./nodos').Continue} Continue


 * @typedef {import('./nodos').Return} Return


 * @typedef {import('./nodos').Incremento} Incremento


 * @typedef {import('./nodos').Decremento} Decremento


 * @typedef {import('./nodos').DeclFuncion} DeclFuncion


 * @typedef {import('./nodos').Llamada} Llamada


 * @typedef {import('./nodos').ArregloFunc} ArregloFunc


 * @typedef {import('./nodos').Struct} Struct


 * @typedef {import('./nodos').RecStruct} RecStruct


 * @typedef {import('./nodos').InstanciaStruct} InstanciaStruct


 * @typedef {import('./nodos').Get} Get


 * @typedef {import('./nodos').Set} Set

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Primitivo} node
     * @returns {any}
     */
    visitPrimitivo(node) {
        throw new Error('Metodo visitPrimitivo no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {TipoVariable} node
     * @returns {any}
     */
    visitTipoVariable(node) {
        throw new Error('Metodo visitTipoVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {AsignacionArreglo} node
     * @returns {any}
     */
    visitAsignacionArreglo(node) {
        throw new Error('Metodo visitAsignacionArreglo no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
    }
    

    /**
     * @param {Arreglo} node
     * @returns {any}
     */
    visitArreglo(node) {
        throw new Error('Metodo visitArreglo no implementado');
    }
    

    /**
     * @param {ArregloVal} node
     * @returns {any}
     */
    visitArregloVal(node) {
        throw new Error('Metodo visitArregloVal no implementado');
    }
    

    /**
     * @param {ArregloVacio} node
     * @returns {any}
     */
    visitArregloVacio(node) {
        throw new Error('Metodo visitArregloVacio no implementado');
    }
    

    /**
     * @param {CopiarArreglo} node
     * @returns {any}
     */
    visitCopiarArreglo(node) {
        throw new Error('Metodo visitCopiarArreglo no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Incremento} node
     * @returns {any}
     */
    visitIncremento(node) {
        throw new Error('Metodo visitIncremento no implementado');
    }
    

    /**
     * @param {Decremento} node
     * @returns {any}
     */
    visitDecremento(node) {
        throw new Error('Metodo visitDecremento no implementado');
    }
    

    /**
     * @param {DeclFuncion} node
     * @returns {any}
     */
    visitDeclFuncion(node) {
        throw new Error('Metodo visitDeclFuncion no implementado');
    }
    

    /**
     * @param {Llamada} node
     * @returns {any}
     */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }
    

    /**
     * @param {ArregloFunc} node
     * @returns {any}
     */
    visitArregloFunc(node) {
        throw new Error('Metodo visitArregloFunc no implementado');
    }
    

    /**
     * @param {Struct} node
     * @returns {any}
     */
    visitStruct(node) {
        throw new Error('Metodo visitStruct no implementado');
    }
    

    /**
     * @param {RecStruct} node
     * @returns {any}
     */
    visitRecStruct(node) {
        throw new Error('Metodo visitRecStruct no implementado');
    }
    

    /**
     * @param {InstanciaStruct} node
     * @returns {any}
     */
    visitInstanciaStruct(node) {
        throw new Error('Metodo visitInstanciaStruct no implementado');
    }
    

    /**
     * @param {Get} node
     * @returns {any}
     */
    visitGet(node) {
        throw new Error('Metodo visitGet no implementado');
    }
    

    /**
     * @param {Set} node
     * @returns {any}
     */
    visitSet(node) {
        throw new Error('Metodo visitSet no implementado');
    }
    
}
