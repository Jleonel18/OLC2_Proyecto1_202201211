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
            case '+':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor + der.valor, tipo: "int" };
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor + der.valor, tipo: "float" };
                    case "string-string":
                        return { valor: izq.valor + der.valor, tipo: "string" };
                    default:
                        throw new Error('No es valida esa operacion');
                }

            case '-':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor - der.valor, tipo: "int" };
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor - der.valor, tipo: "float" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '*': 
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor * der.valor, tipo: "int" };
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor * der.valor, tipo: "float" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
                case '/':
                    // Verifica si el divisor es cero antes de realizar la división
                    if (der.valor === 0) {
                        throw new Error('División por cero no permitida');
                    }
                
                    switch (`${izq.tipo}-${der.tipo}`) {
                        case "int-int":
                            // Realiza la división y redondea el resultado a un entero
                            const divisionInt = Math.round(izq.valor / der.valor);
                            return { valor: divisionInt, tipo: "int" };
                        
                        case "int-float":
                        case "float-int":
                        case "float-float":
                            // Realiza la división y el resultado es un float
                            return { valor: izq.valor / der.valor, tipo: "float" };
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
            case '<':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        return { valor: izq.valor < der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '>':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        return { valor: izq.valor > der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '<=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        return { valor: izq.valor <= der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '>=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        return { valor: izq.valor >= der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '%': 
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor % der.valor, tipo: "int" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '==':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "boolean-boolean":
                    case "string-string":
                    case "char-char":
                        return { valor: izq.valor == der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '!=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "boolean-boolean":
                    case "string-string":
                    case "char-char":
                        return { valor: izq.valor != der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '&&':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        return { valor: izq.valor && der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
            case '||':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        return { valor: izq.valor || der.valor, tipo: "boolean" };
                    default:
                        throw new Error('No es valida esa operacion');
                }
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
     * @type {BaseVisitor['visitPrimitivo']}
     */
    visitPrimitivo(node) {
        return {valor:node.valor,tipo:node.tipo};
    }

    /**
     * @type {BaseVisitor['visitTipoVariable']}
     */
    visitTipoVariable(node) {
        var tipoVar = node.tipo;
        const nombreVar = node.id;
        
        if(node.exp){
            const valor = node.exp.accept(this);

            if (tipoVar === "int") {
                if (tipoVar !== valor.tipo) {
                    throw new Error(`El tipo del valor no coincide con el tipo ${tipoVar}`);
                }
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
            } else if (tipoVar === "float") {
                if (tipoVar !== valor.tipo && valor.tipo !== "int") {
                    throw new Error(`El tipo del valor no coincide con el tipo ${tipoVar}`);
                }
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
            } else if (tipoVar === "string") {
                if (tipoVar !== valor.tipo) {
                    throw new Error(`El tipo del valor no coincide con el tipo ${tipoVar}`);
                }
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
            } else if (tipoVar === "boolean") {
                if (tipoVar !== valor.tipo) {
                    throw new Error(`El tipo del valor no coincide con el tipo ${tipoVar}`);
                }
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
            } else if (tipoVar === "char") {
                if (tipoVar !== valor.tipo) {
                    throw new Error(`El tipo del valor no coincide con el tipo ${tipoVar}`);
                }
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
            } else {
                throw new Error(`Tipo ${tipoVar} no es valido`);
            }
            
            return
        }

        this.entornoActual.setVariable(tipoVar, nombreVar, null);
    }

    /**
    *@type {BaseVisitor['visitDeclaracionVariable']}
    */
    visitDeclaracionVariable(node) {
        var nombreVariable = node.id;
        var valorVariable = node.exp.accept(this);
    
        this.entornoActual.setVariable(valorVariable.tipo, nombreVariable, valorVariable.valor);
    }
    
    /**
     * @type {BaseVisitor['visitReferenciaVariable']}
     */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id
        const valorVariable = this.entornoActual.getVariable(nombreVariable)

        console.log("el valor de la variable es: ", valorVariable);
        
        return {valor: valorVariable.valor, tipo: valorVariable.tipo};
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
        const valor = node.exp.accept(this);
        this.salida += valor.valor + ' ';
        node.exps.forEach(exp => this.salida += exp.accept(this).valor + ' ');
        this.salida += '\n';
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

    this.entornoActual.updateVariable(node.id,valorA);
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

