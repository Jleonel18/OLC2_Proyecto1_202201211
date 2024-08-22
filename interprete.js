import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";

export class InterpreterVisitor extends BaseVisitor{


    /**
     * 
     * @param {Entorno} padre 
     */
    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = "";
    }

    /**
    *@type {BaseVisitor['visitExpresion']} 
    */ 
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }


    /**
    *@type {BaseVisitor['visitOperacionBinaria']} 
    */ 
    visitOperacionBinaria(node) {
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);

        switch(node.op) {
            case '+': return izq + der;
            case '-': return izq - der;
            case '*': return izq * der;
            case '/': return izq / der;
            case '<': return izq < der;
            case '>': return izq > der; 
            case '<=': return izq <= der;
            case '>=': return izq >= der;
            case '%': return izq % der;
            case '==': return izq === der;
            case '!=': return izq !== der;
            case '&&': return izq && der;
            case '||': return izq || der;
            default: throw new Error(`Operador desconocido: ${node.operador}`);
        }
    }
    
    /**
    *@type {BaseVisitor['visitOperacionUnaria']} 
    */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);
        switch(node.op) {
            case '-': 
                return -exp;
            case '!':
                return !exp;
            default: 
                throw new Error(`Operador desconocido: ${node.operador}`);
        }
    }
    
    /**
    *@type {BaseVisitor['visitAgrupacion']}
    */
    visitAgrupacion(node) {
        return node.exp.accept(this);
    }
    
    /**
    *@type {BaseVisitor['visitNumero']}
    */
    visitNumero(node) {
        return node.valor;
    }
    
    /**
     * @type {BaseVisitor['visitCadena']}
     */
    visitCadena(node) {
        return node.valor;
    }

    /**
     * @type {BaseVisitor['visitCaracter']}
     */
    visitCaracter(node) {
        return node.valor;
    }

    /**
     * @type {BaseVisitor['visitBooleano']}
     */
    visitBooleano(node) {
        return node.valor;
    }

    /**
    *@type {BaseVisitor['visitDeclaracionVariable']}
    */
    visitDeclaracionVariable(node) {
        const nombreVariable = node.id;
        const valorVariable = node.exp.accept(this);
    
        //console.log("el tipo de dato es:", node.tipo);
        //console.log("El tipo de dato de la variable es:", typeof valorVariable);
    
        switch (node.tipo) {
            case "int":
                const valorConvertidoInt = parseInt(valorVariable, 10);
                if (!Number.isInteger(valorConvertidoInt)) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo int`);
                }
                if (valorConvertidoInt.toString() !== valorVariable.toString()) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo int`);
                }
                break;
    
            case "float":
                const valorConvertidoFloat = parseFloat(valorVariable);
                if (isNaN(valorConvertidoFloat)) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo float`);
                }
                // Verifica que el valor convertido sea numérico y mantenga la precisión
                if (valorConvertidoFloat.toString() !== valorVariable.toString()) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo float`);
                }
                break;
    
            case "string":
                if (typeof valorVariable !== 'string') {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo string`);
                }
                break;
    
            case "char":
                if (typeof valorVariable !== 'string' || valorVariable.length !== 1) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo char`);
                }
                break;
    
            case "bool":
                if (typeof valorVariable !== 'boolean') {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo boolean`);
                }
                break;
        }
    
        this.entornoActual.setVariable(node.tipo,nombreVariable, valorVariable);
    }
    
    /**
     * @type {BaseVisitor['visitReferenciaVariable']}
     */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id
        const valorVariable = this.entornoActual.getVariable(nombreVariable)
        
        return valorVariable
    }

    /**
     * @type {BaseVisitor['visitIncremento']}
     */
    visitIncremento(node){
        const nombreVariable = node.id;
        const valorVariable = this.entornoActual.getVariable(nombreVariable);
        this.entornoActual.updateVariable(nombreVariable,( parseInt(valorVariable) + 1));
        return parseInt(valorVariable + 1);
    }

    /**
     * @type {BaseVisitor['visitDecremento']}
     */
    visitDecremento(node){
            
            const nombreVariable = node.id;
            const valorVariable = this.entornoActual.getVariable(nombreVariable);
            this.entornoActual.updateVariable(nombreVariable,( parseInt(valorVariable) - 1));
            return parseInt(valorVariable - 1);
    }

    /**
     * @type {BaseVisitor['visitPrint']}
     */
    visitPrint(node) {
        this.salida += node.exp.accept(this) + '\n';
    }
    

    /**
     * @type {BaseVisitor['visitExpresionStmt']}
     */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

/**
* @type {BaseVisitor['visitAsignacion']}
*/
visitAsignacion(node) {
    const valorA = node.exp.accept(this);
    const tipoVariable = this.entornoActual.getTipoVariable(node.id);
    //console.log("Tipo de variable: ", tipoVariable);
    //console.log("Valor de la variable: ", valorA);
    
    switch(tipoVariable) {
        case 'int':
            if (typeof valorA !== 'number' || !Number.isInteger(valorA)) {
                throw new Error(`El valor asignado a la variable ${node.id} no es de tipo int`);
            }
            break;
        case 'float':
            if (typeof valorA !== 'number') {
                throw new Error(`El valor asignado a la variable ${node.id} no es de tipo float`);
            }
            break;
        case 'string':
            if (typeof valorA !== 'string') {
                throw new Error(`El valor asignado a la variable ${node.id} no es de tipo string`);
            }
            break;
        case 'char':
            if (typeof valorA !== 'string' || valorA.length !== 1) {
                throw new Error(`El valor asignado a la variable ${node.id} no es de tipo char`);
            }
            break;
        case 'bool':
            if (typeof valorA !== 'boolean') {
                throw new Error(`El valor asignado a la variable ${node.id} no es de tipo bool`);
            }
            break;
        default:
            throw new Error(`Tipo de dato desconocido: ${tipoVariable}`);
    }

    this.entornoActual.updateVariable(node.id, valorA);
    
    return valorA;
}


    /**
     * @type {BaseVisitor['visitBloque']}
     */
    visitBloque(node) {
        const entornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(entornoAnterior);

        node.decl.forEach(decl => decl.accept(this));
        this.entornoActual = entornoAnterior;


    }

    /**
     * @type {BaseVisitor['visitIf']}
     */
    visitIf(node) {
        const condicion = node.cond.accept(this);
        console.log("Condicion: ", condicion);
        
        if(condicion){
            node.stmtT.accept(this);
            return
        }

        if(node.stmtElse) {
            node.stmtElse.accept(this);
        }
    }

    /**
     * @type {BaseVisitor['visitWhile']}
     */
    visitWhile(node) {
        while(node.cond.accept(this)) {
            node.stmt.accept(this);
        }
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {

        const entornoAnterior = this.entornoActual;
        this.entornoActual  = new Entorno(entornoAnterior);
        node.inic.accept(this);

        while(node.cond.accept(this)) {
            node.stmt.accept(this);
            node.incremento.accept(this);
        }

        this.entornoActual = entornoAnterior;
    }

}

