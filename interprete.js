import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";

export class InterpreterVisitor extends BaseVisitor{


    /**
     * 
     * @param {Entorno} padre 
     */
    constructor(padre = undefined) {
        super();
        this.entornoActual = new Entorno();
        this.salida = "";
        this.padre = padre;
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
    *@type {BaseVisitor['visitDeclaracionVariable']}
    */
    visitDeclaracionVariable(node) {
        const nombreVariable  = node.id;
        const valorVariable = node.exp.accept(this);

        this.entornoActual.setVariable(nombreVariable, valorVariable);
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

}

