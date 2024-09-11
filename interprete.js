import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";
import nodos,{ Expresion } from "./nodos.js";
import { BreakException, ContinueException, SemanticError, ReturnException } from "./transfer.js";
import { Foreign } from "./foreign.js";
import { Invocar } from "./invocar.js";
import { errores } from "./index.js";
import { Struct } from "./struct.js";
import { Instancia } from "./instancia.js";

export class InterpreterVisitor extends BaseVisitor{


    /**
     * 
     * @param {Entorno} padre 
     */
    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = "";

        /**
         * @type {Expresion|null}
         */
        this.expPrevia = null;

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

        /*if(izq.valor == null || der.valor == null){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
            errores.push(err);
            
        }*/

        switch(node.op) {
            case '+':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(izq.valor == null || der.valor == null){
                            console.log("aqui estoooy")
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "int" };
                        }
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "float" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "float" };
                        }
                    case "string-string":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "string" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "string" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }

            case '-':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor - der.valor, tipo: "int" };
                        }
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "float" };
                        }else{
                            return { valor: izq.valor - der.valor, tipo: "float" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '*': 
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor * der.valor, tipo: "int" };
                        }
                    case "int-float":
                    case "float-int":
                    case "float-float":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "float" };
                        }else{
                            return { valor: izq.valor * der.valor, tipo: "float" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
                case '/':
                
                    switch (`${izq.tipo}-${der.tipo}`) {
                        case "int-int":
                            // Realiza la división y redondea el resultado a un entero
                            if (der.valor === 0) {
                                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede dividir por cero`);
                                errores.push(err);
                                return { valor: null, tipo: "int" };
                            }
                            if(izq.valor == null || der.valor == null){
                                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                                errores.push(err);
                                return { valor: null, tipo: "int" };
                            }else{
                                const divisionInt = Math.floor(izq.valor / der.valor);
                                return { valor: divisionInt, tipo: "int" };
                            }
                        
                        case "int-float":
                        case "float-int":
                        case "float-float":
                            if (der.valor === 0) {
                                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede dividir por cero`);
                                errores.push(err);
                                return { valor: null, tipo: "float" };
                            }
                            if(izq.valor == null || der.valor == null){
                                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                                errores.push(err);
                                return { valor: null, tipo: "float" };
                            }else{
                                return { valor: izq.valor / der.valor, tipo: "float" };
                            }                        
                        default:
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                            errores.push(err);
                            return { valor: null, tipo: "null" };
                    }
            case '<':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor < der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '>':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor > der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '<=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor <= der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '>=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                    case "int-float":
                    case "float-int":
                    case "float-float":
                    case "char-char":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor >= der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '%': 
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(der.valor === 0) {
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede dividir por cero`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor % der.valor, tipo: "int" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
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
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor == der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
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
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor != der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '&&':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor && der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '||':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "boolean" };
                        }else{
                            return { valor: izq.valor || der.valor, tipo: "boolean" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '+=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "int" };
                        }
                    case "float-int":
                    case "float-float":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "float" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "float" };
                        }
                    case "string-string":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "string" };
                        }else{
                            return { valor: izq.valor + der.valor, tipo: "string" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return { valor: null, tipo: "null" };
                }
            case '-=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "int" };
                        }else{
                            return { valor: izq.valor - der.valor, tipo: "int" };
                        }
                    case "float-int":
                    case "float-float":
                        if(izq.valor == null || der.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return { valor: null, tipo: "float" };
                        }else{
                            return { valor: izq.valor - der.valor, tipo: "float" };
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                }
            default:
                let err = new SemanticError(node.location.start.line,node.location.start.column,`Operador desconocido: ${node.op}`);
                errores.push(err);
        }
    }
    
    /**
    *@type {BaseVisitor['visitOperacionUnaria']} 
    */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);

        /*if(exp.valor == null){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
            errores.push(err);
            return {valor: null, tipo: exp.tipo};
        }*/

        switch(node.op) {
            case '-': 
                switch(exp.tipo){
                    case "int":
                        if(exp.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return {valor: null, tipo: exp.tipo}
                        }else{
                            return {valor: -exp.valor, tipo: exp.tipo}
                        }
                    case "float":
                        if(exp.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return {valor: null, tipo: exp.tipo}
                        }else{
                            return {valor: -exp.valor, tipo: exp.tipo}
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return {valor: null, tipo: exp.tipo}
                }
            case '!':
                switch(exp.tipo){
                    case "boolean":
                        if(exp.valor == null){
                            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                            errores.push(err);
                            return {valor: null , tipo: exp.tipo}
                        }else{
                            return {valor: !exp.valor, tipo: exp.tipo}
                        }
                    default:
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                        errores.push(err);
                        return {valor: null , tipo: exp.tipo}
                }
            case 'typeof':
                //console.log("el tipo es:",exp.tipo)
                
                return {valor:exp.tipo ,tipo:'string'};
                
            case 'toString':
                if(exp.valor == null){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                    errores.push(err);
                    return {valor: null , tipo: 'string'}
                }else{
                    return {valor:exp.valor.toString(),tipo:'string'};
                }
            case 'toUpperCase':

                if(exp.tipo != "string"){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a mayúsculas un valor que no es de tipo string`);
                    errores.push(err);
                    return {valor: null , tipo: 'string'}
                }else{
                    if(exp.valor == null){
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                        errores.push(err);
                        return {valor: null , tipo: 'string'}
                    }else{
                        return {valor:exp.valor.toUpperCase(),tipo:'string'};
                    }
                }

                
            case 'toLowerCase':

                if(exp.tipo != "string"){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a minúsculas un valor que no es de tipo string`);
                    errores.push(err);
                    return {valor: null , tipo: 'string'}
                }else{
                    if(exp.valor == null){
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede realizar la operación con un valor nulo`);
                        errores.push(err);
                        return {valor: null , tipo: 'string'}
                    }else{
                        return {valor:exp.valor.toLowerCase(),tipo:'string'};
                    }
                }

                
            
            case 'parseInt':
                // Verificar si exp.tipo es "string"
                if (exp.tipo === "string") {
                    // Intentar convertir el string a float primero
                    const num = parseFloat(exp.valor);
            
                    // Verificar si el valor convertido es un número y no tiene letras
                    if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(exp.valor)) {
                        
                        // Convertir a int redondeando hacia abajo
                        return { valor: Math.floor(num), tipo: 'int' };
                    }else{
                        // Si no se puede convertir
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a int`);
                        errores.push(err);
                        return {valor: null, tipo: 'int'};
                    }
                }else{
                    // Si no se puede convertir
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a int`);
                    errores.push(err);
                    return {valor: null, tipo: 'int'};
                }
                
            case 'parseFloat':
                // Verificar si el tipo es "string"
                if (exp.tipo === "string") {
                    // Intentar convertir el string a float
                    const num = parseFloat(exp.valor);
                
                    // Verificar si el valor convertido es un número y el string original es un número válido
                    if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(exp.valor)) {
                        return { valor: num, tipo: 'float' };
                    }else{
                        // Si no se puede convertir
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a float`);
                        errores.push(err);
                        return {valor: null, tipo: 'float'};
                    }
                }else{
                    // Si no se puede convertir
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a float`);
                    errores.push(err);
                    return {valor: null, tipo: 'float'};
                }
                
            default:
                let err = new SemanticError(node.location.start.line,node.location.start.column,`Operador desconocido: ${node.op}`);
                errores.push(err); 
        }
    }

    /**
     * @type {BaseVisitor['visitTernario']}
     */
    visitTernario(node) {
        const condicion = node.condi.accept(this);

        if(condicion.tipo != "boolean"){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`La condición del operador ternario no es de tipo boolean`);
            errores.push(err);
        }

        if(condicion.valor){
            return node.exp1.accept(this);
        }else{
            return node.exp2.accept(this);
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
    
    if (node.exp) {
        const valor = node.exp.accept(this);

        if (tipoVar == "int") {
            if (tipoVar != valor.tipo) {
                this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
                errores.push(err);

            }else{
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor,node.location.start.line,node.location.start.column);
            }
        } else if (tipoVar === "float") {
            if (tipoVar !== valor.tipo && valor.tipo !== "int") {
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
                errores.push(err);
                this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
            }else{
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor,node.location.start.line,node.location.start.column);
            }
        } else if (tipoVar === "string") {
            if (tipoVar !== valor.tipo) {
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
                errores.push(err);
                this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
            }else{
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor,node.location.start.line,node.location.start.column);
            }
        } else if (tipoVar === "boolean") {
            if (tipoVar !== valor.tipo) {
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
                errores.push(err);
                this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
            }else{
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor,node.location.start.line,node.location.start.column);
            }
        } else if (tipoVar === "char") {
            if (tipoVar !== valor.tipo) {
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
                errores.push(err);
                this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
            }else{
                this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor,node.location.start.line,node.location.start.column);
            }
        } else {
            let err = new SemanticError(node.location.start.line,node.location.start.column,`Tipo de variable no válido`);
            errores.push(err);
            this.entornoActual.setVariable(tipoVar, nombreVar, null,node.location.start.line,node.location.start.column);
        }
        
        return;
    }

    let valorPredeterminado;
    switch (tipoVar) {
        case "int":
        case "float":
            valorPredeterminado = null; // Valor predeterminado para int y float
            break;
        case "char":
            valorPredeterminado = null; 
            break;
        case "string":
            valorPredeterminado = null; 
            break;
        case "boolean":
            valorPredeterminado = null; 
            break;
        default:
            let err = new SemanticError(node.location.start.line,node.location.start.column,`Tipo de variable no válido`);
            errores.push(err);
    }

    this.entornoActual.setVariable(tipoVar, nombreVar, valorPredeterminado,node.location.start.line,node.location.start.column);
}


/**
 * @type {BaseVisitor['visitDeclaracionVariable']}
 */
visitDeclaracionVariable(node) {
    const nombreVariable = node.id;
    
    // Verificar si hay una expresión asignada
    if (!node.exp) {
        let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${nombreVariable} no tiene un valor asignado`);
        errores.push(err);
    }

    // Evaluar la expresión para obtener el valor y el tipo
    const valorVariable = node.exp.accept(this);
    
    // Asignar la variable con el tipo y valor deducidos
    if(valorVariable.tipo == "null"){
        let err = new SemanticError(node.location.start.line,node.location.start.column,`No se le pudo asignar un tipo a la variable ${nombreVariable}`);
        errores.push(err);
    }else{
        this.entornoActual.setVariable(valorVariable.tipo, nombreVariable, valorVariable.valor,node.location.start.line,node.location.start.column);
    }
}

    
    /**
     * @type {BaseVisitor['visitReferenciaVariable']}
     */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id
        const pos = node.pos.map(p => p.accept(this));

        const variable = this.entornoActual.getVariable(nombreVariable,node.location.start.line,node.location.start.column);

        if(variable == undefined){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${nombreVariable} no está definida`);
            errores.push(err);
            return
        }

        if(pos.length == 1){
                
                const expresion = pos[0];
                if(!Array.isArray(variable.valor)){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`La variable ${nombreVariable} no es un arreglo`);
                }
                
                if(expresion.tipo != "int"){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero`);
                }

                if(expresion.valor > variable.valor.length){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo está fuera de rango`);
                }

                return {valor: variable.valor[expresion.valor], tipo: variable.tipo};

        }else if(pos.length > 1){

            let pivote = variable.valor;

            for(let i = 0; i < pos.length; i++){
                const expresion = pos[i];
                if(!Array.isArray(pivote)){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${nombreVariable} no es un arreglo de arreglos`);
                    errores.push(err);
                }

                if(expresion.tipo != "int"){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero`);
                    errores.push(err);
                }

                if(expresion.valor > pivote.length){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo está fuera de rango`);
                    errores.push(err);
                }

                pivote = pivote[expresion.valor];

            }

            return {valor: pivote, tipo: variable.tipo};

        }
        
        return {valor: variable.valor, tipo: variable.tipo};
    }

    /**
     * @type {BaseVisitor['visitIncremento']}
     */
    visitIncremento(node){
        const nombreVariable = node.id;
        const valorVariable = this.entornoActual.getVariable(nombreVariable,node.location.start.line,node.location.start.column);
        //console.log("el tipo de variable es:",valorVariable.tipo)
        if(valorVariable.valor == null){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede incrementar una variable que no tiene valor`);
            errores.push(err);
            return {valor: null, tipo: valorVariable.tipo};
        }else if(valorVariable.tipo != "int" && valorVariable.tipo != "float"){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede incrementar una variable que no es de tipo int o float`);
            errores.push(err);
            return {valor: valorVariable.valor, tipo: valorVariable.tipo};
            /*if(valorVariable.tipo != "int" && valorVariable.tipo != "float"){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede incrementar una variable que no es de tipo int o float`);
                errores.push(err);
                return {valor: valorVariable.valor, tipo: valorVariable.tipo};
            }*/
    
            
        }else{
            this.entornoActual.updateVariable(nombreVariable,{valor: valorVariable.valor + 1, tipo: valorVariable.tipo},node.location.start.line,node.location.start.column);
            return {valor:valorVariable.valor + 1 , tipo: valorVariable.tipo};
        }
        
    }

    /**
     * @type {BaseVisitor['visitDecremento']}
     */
    visitDecremento(node){

        const nombreVariable = node.id;
        const valorVariable = this.entornoActual.getVariable(nombreVariable,node.location.start.line,node.location.start.column);
        //console.log("el tipo de variable es:",valorVariable.tipo)
        if(valorVariable.valor == null){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede decrementar una variable que no tiene valor`);
            errores.push(err);
            return {valor: null, tipo: valorVariable.tipo};
        }else if (valorVariable.tipo != "int" && valorVariable.tipo != "float"){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede decrementar una variable que no es de tipo int o float`);
            errores.push(err);
            return {valor: valorVariable.valor, tipo: valorVariable.tipo} 
            /*if(valorVariable.tipo != "int" && valorVariable.tipo != "float"){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`No se puede decrementar una variable que no es de tipo int o float`);
                errores.push(err);
                return {valor: valorVariable.valor, tipo: valorVariable.tipo
            }*/
    
            
        }else{
            this.entornoActual.updateVariable(nombreVariable,{valor: valorVariable.valor - 1, tipo: valorVariable.tipo},node.location.start.line,node.location.start.column);
            return {valor:valorVariable.valor - 1 , tipo: valorVariable.tipo};
        }
    }

    /**
     * @type {BaseVisitor['visitPrint']}
     */
    visitPrint(node) {
        const valor = node.exp.accept(this);
        if(valor != undefined){
            this.salida += valor.valor + ' ';
        node.exps.forEach(exp => this.salida += exp.accept(this).valor + ' ');
        this.salida += '\n';
        }
        
    }
    

    /**
     * @type {BaseVisitor['visitExpresionStmt']}
     */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

    /**
     * @type {BaseVisitor['visitStruct']}
     */
    visitStruct(node) {            
            const propiedades = {};

            node.decl.forEach(d => {

                propiedades[d.id] = {
                    tipo: d.tipo,
                    valor: null
                    
                };
            });

            const nuevoStruct = new Struct(node.id, propiedades);

            this.entornoActual.setVariable(node.id,node.id, nuevoStruct,node.location.start.line,node.location.start.column);
    }

    /**
     * @type {BaseVisitor['visitInstanciaStruct']}
     */
    visitInstanciaStruct(node){
        const tipo = node.tipo;
            const id = node.id;
            const instancia = node.instancia.accept(this);
            
            const struct = this.entornoActual.getVariable(tipo,node.location.start.line,node.location.start.column).valor;


            if(tipo != instancia.tipo) {
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de la instancia no coincide con el tipo de la estructura`);
                errores.push(err);
            }

            if(!(struct instanceof Struct)){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${tipo} no es una estructura`);
                errores.push(err);
            }
            
            this.entornoActual.setVariable(tipo, id, instancia.valor,node.location.start.line,node.location.start.column);

            return struct.invocar(this, instancia.valor.struct.properties);
    }

    /**
     * @type {BaseVisitor['visitRecStruct']}
     */
    visitRecStruct(node){
        const tipo = node.tipo;
            const atributos = node.atrib 

            let temp = {};

            const struct = this.entornoActual.getVariable(tipo,node.location.start.line,node.location.start.column);

            if(!(struct.valor instanceof Struct)){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${tipo} no es una estructura`);
                errores.push(err);
            }

            atributos.forEach(atributo => {
                const id = atributo.id;
                if(!(id in struct.valor.properties)){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El atributo ${id} no existe en la estructura`);
                    errores.push(err);
                }

                const pivote = atributo.exp.accept(this);

                if(struct.valor.properties[id].tipo != pivote.tipo){
                    if(!(struct.valor.properties[id].tipo == "float" && pivote.tipo == "int")){
                        
                        let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo del atributo ${id} no coincide con el tipo de la estructura`);
                        errores.push(err);
                    }
                }
                    temp[id] = {valor:pivote.valor , tipo:pivote.tipo};

                    
            });

            return {valor:new Instancia(new Struct(tipo, temp)), tipo:tipo};
    }

    /**
     * @type {BaseVisitor['visitGet']}
     */
    visitGet(node){
        const instan = node.objetivo.accept(this);

            if(!(instan.valor instanceof Instancia)){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${instan.valor} no es una instancia`);
                errores.push(err);
            }

            return instan.valor.get(node.propiedad,node);
    }

    /**
     * @type {BaseVisitor['visitSet']}
     */
    visitSet(node){
        const instan = node.objetivo.accept(this);

            if(!(instan.valor instanceof Instancia)){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`La variable ${instan.valor} no es una instancia`);
                errores.push(err);
            }

            const valor = node.valor.accept(this);

            instan.valor.set(node.propiedad, valor,node);

            return valor;
    }

/**
* @type {BaseVisitor['visitAsignacion']}
*/
visitAsignacion(node) {

    /*console.log("el node:",node)
    console.log("el asgn:",node.asgn)*/

    const valorA = node.asgn.accept(this);

    this.entornoActual.updateVariable(node.id,valorA,node.location.start.line,node.location.start.column);
    return valorA;
}

    /**
     * @type {BaseVisitor['visitAsignacionArreglo']}
     */
    visitAsignacionArreglo(node) {
        const valor = node.asg.accept(this);
        const pos = node.pos.map(p => p.accept(this));

        if(pos.length ==1){

            const expresion = pos[0];

            if(expresion.tipo != "int" || expresion.valor <0){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero positivo y un entero`);
                errores.push(err);
            }

            this.entornoActual.updateVariableArreglo(node.id,valor,expresion,node.location.start.line,node.location.start.column);
            return valor;

        }

        if(pos.length > 1){
            pos.forEach(p => {
                if(p.tipo != "int" || p.valor <0){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero positivo y un entero`);
                    errores.push(err);
                }
            });

            this.entornoActual.updateVariableMatriz(node.id,valor,pos,node.location.start.line,node.location.start.column);
            return valor;

        }

        this.entornoActual.updateVariable(node.id,valor,node.location.start.line,node.location.start.column);
        return valor;

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
        //console.log("Condicion: ", condicion.valor);
        
        if(condicion.valor){
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

        const entornoAnterior = this.entornoActual;

        try{

            while(node.cond.accept(this).valor) {
                node.stmt.accept(this);
            }

        }catch(e){

            this.entornoActual = entornoAnterior;

            if(e instanceof BreakException){
                return;
            }

            if(e instanceof ContinueException){
                return this.visitWhile(node);
            }

            throw e;
        }
        
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {

        //this.expPrevia = node.inic;

        const incAnt = this.expPrevia;
        this.expPrevia = node.incremento;

        const forT = new nodos.Bloque({
            decl: [
                node.inic,
                new nodos.While({
                    cond: node.cond,
                    stmt: new nodos.Bloque({
                        decl: [
                            node.stmt,
                            node.incremento
                        ]
                    })
                })
            ]
        })

        forT.accept(this);

        this.expPrevia = incAnt;

    }

    /**
     * @type {BaseVisitor['visitForeach']}
     */
    visitForeach(node) {
        const id = node.id
        const tipo = node.tipo
        const id2 = node.id2
        const temporal = this.entornoActual.getVariable(id2, node.location.start.line, node.location.start.column)
    
        const entornoAnterior = this.entornoActual
        this.entornoActual = new Entorno(entornoAnterior)
    
        if (!Array.isArray(temporal.valor)) {
            let err = new SemanticError(node.location.start.line, node.location.start.column, `El id ${id2} no es un arreglo`)
            errores.push(err)
            return
        }
    
        if (tipo !== temporal.tipo) {
            let err = new SemanticError(node.location.start.line, node.location.start.column, `El tipo de la variable ${id} no coincide con el tipo del arreglo`)
            errores.push(err)
            return
        }
    
        temporal.valor.forEach(value => {
            this.entornoActual.setVariable(temporal.tipo, id, value,node.location.start.line, node.location.start.column);
    
            node.stmt.accept(this);
    
            this.entornoActual.eliminarTemporal(id, node.location.start.line, node.location.start.column);
        });
        this.entornoActual = entornoAnterior
    }

    /**
     * @type {BaseVisitor['visitBreak']}
     */
    visitBreak(node) {

        throw new BreakException();

    }

    /**
     * @type {BaseVisitor['visitContinue']}
     */
    visitContinue(node) {

        if(this.expPrevia){
            this.expPrevia.accept(this);
        }

        throw new ContinueException();

    }

    /**
     * @type {BaseVisitor['visitReturn']}
     */
    visitReturn(node) {
        let v = null;
        if(node.exp){
            v = node.exp.accept(this);
        }

        throw new ReturnException(v);

    }

    /**
     * @type {BaseVisitor['visitArreglo']}
     */
    visitArreglo(node) {
        const vals = node.vls.map(v => v.accept(this));
        const tipo1 = vals[0].tipo;
        const igualTipo = vals.every(v => v.tipo === tipo1);

        if(!igualTipo) {
            let err = new SemanticError(node.location.start.line,node.location.start.column,`Los valores del arreglo no son del mismo tipo`);
            errores.push(err);
        }

        const arregloGuardado  = vals.map(v => v.valor);

        return {tipo:tipo1, valor:arregloGuardado};

    }

    /**
     * @type {BaseVisitor['visitArregloVal']}
     */
    visitArregloVal(node) {
        const tipo = node.tipo;
        const identificador = node.id;
        const vals = node.valores.accept(this);
        if(node.tmn.length <= 1){
            
            let pivote = [];

            vals.valor.forEach(v => {

                if(Array.isArray(v.valor)){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El valor a asignar no es un valor primitivo`);
                    errores.push(err);
                }

                if(tipo == "float" && vals.tipo == "int") {
                    pivote.push(parseFloat(v));
                }else if (tipo != vals.tipo){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
                    errores.push(err);
                }else{
                    pivote.push(v);
                }

            })

            this.entornoActual.setVariable(tipo, identificador, pivote,node.location.start.line,node.location.start.column);

        }else{

            const dimens = node.tmn.length;
            let pivote = [];

            vals.valor.forEach( v=>{

                if(!Array.isArray(v)){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El valor a asignar no es un arreglo`);
                    errores.push(err);
                }

                if(tipo == "float" && vals.tipo == "int"){
                    pivote.push(v);
                }else if(tipo != vals.tipo) {
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
                    errores.push(err);
                }else{
                    pivote.push(v);
                }

            })

            if(!this.comprobarDimensiones(pivote,dimens)){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`Las dimensiones del arreglo no coinciden`);
                errores.push(err);
            }

            this.entornoActual.setVariable(tipo, identificador, pivote,node.location.start.line,node.location.start.column);

        }
    }

    comprobarDimensiones(arreglo, numero){
        if (numero === 0) {
            return !Array.isArray(arreglo);
        }
    
        if (!Array.isArray(arreglo)) {
            return false;
        }
    
        // Recursivamente validar cada sub-array dentro del valor del objeto
        for (let sub of arreglo) {
            if (!this.comprobarDimensiones(sub, numero - 1)) {
                return false;
            }
        }
    
        // Si todos los sub-arrays son válidos, entonces el array es válido
        return true;
    }

    /**
     * @type {BaseVisitor['visitArregloVacio']}
     */
    visitArregloVacio(node) {

        const tipo1 = node.tipo1;
        const tipo2 = node.tipo2;
        const dimens = node.tmn.length;
        const id = node.id;
        const tamanos = node.tamanos.map(t => t.accept(this));

        if(tipo1 != tipo2){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de los arreglos no coincide`);
            errores.push(err);
        }

        if(dimens != tamanos.length){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`Las dimensiones del arreglo no coinciden`);
            errores.push(err);
        }

        if(dimens <= 1 && tamanos.length <=1){

            if(tamanos[0].tipo != "int" || tamanos[0].valor<0){
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tamaño del arreglo no es un entero positivo`);
            }

            let valorAsignar;
            if(tipo1 == "int"){
                valorAsignar = 0;
            }else if(tipo1 == "float"){
                valorAsignar = 0.0;
            }else if(tipo1 == "string"){
                valorAsignar = "";
            }else if(tipo1 == "boolean"){
                valorAsignar = true;
            }else if(tipo1 == "char"){
                valorAsignar = '';
            }
            
            if(tipo1 == "boolean") valorAsignar = false;

            let pivote = [];

            for(let i = 0; i < tamanos[0].valor; i++){
                pivote[i] = valorAsignar;
            }
            this.entornoActual.setVariable(tipo1,id,pivote,node.location.start.line,node.location.start.column);

        }else{

            tamanos.forEach(t =>{
                if(t.tipo != "int" || t.valor <0){
                    let err = new SemanticError(node.location.start.line,node.location.start.column,`El tamaño del arreglo no es un entero positivo`);
                    errores.push(err);
                }
            })

            let matrizAsignar = (tamanos, i=0) =>{
                if(i === tamanos.length){
                    let valorAsignar;
                    if(tipo1 == "int"){
                        valorAsignar = 0;
                    }else if(tipo1 == "float"){
                        valorAsignar = 0.0;
                    }else if(tipo1 == "string"){
                        valorAsignar = "";
                    }else if(tipo1 == "boolean"){
                        valorAsignar = true;
                    }else if(tipo1 == "char"){
                        valorAsignar = '';
                    }
                    if(tipo1 == "boolean") valorAsignar = false;
                    return valorAsignar;
                }
                return new Array(tamanos[i].valor).fill().map(()=>
                    matrizAsignar(tamanos,i+1)
                );
            };

            this.entornoActual.setVariable(tipo1,id,matrizAsignar(tamanos),node.location.start.line,node.location.start.column);

        }

    }

    /**
     * @type {BaseVisitor['visitCopiarArreglo']}
     */
    visitCopiarArreglo(node) {
        const tipo = node.tipo;
        const id = node.id;

        const copiaArreglo = node.exp.accept(this);

        if(!Array.isArray(copiaArreglo.valor)){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El valor a copiar no es un arreglo`);
            errores.push(err);
        }

        if(Array.isArray(copiaArreglo.valor[0])){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El valor a copiar no es un arreglo de arreglos`);
            errores.push(err);
        }

        if(tipo == "float" && copiaArreglo.tipo == "int"){
            const copiar = [...copiaArreglo.valor];
            this.entornoActual.setVariable(tipo,id,copiar,node.location.start.line,node.location.start.column);
        }else if(tipo != copiaArreglo.tipo){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
            errores.push(err);
        }else{
            const copiar = [...copiaArreglo.valor];
            this.entornoActual.setVariable(tipo,id,copiar,node.location.start.line,node.location.start.column);
        }

    }

    /**
     * @type {BaseVisitor['visitArregloFunc']}
     */
    visitArregloFunc(node){
        const arr = node.id.accept(this).valor;

        switch(node.op){
            case "length":
                const len = arr.length;
                return {valor:len,tipo:"int"};
            case "join()":
                let str = "";
                for(let i =0; i<arr.length; i++){
                    str += arr[i].toString();
                    if(i < arr.length-1){
                        str += ",";
                    }
                }
                return {valor:str,tipo:"string"};
            case "indexOf":
                const valor = node.params.valor
                for(let i =0; i<arr.length; i++){
                    const e = arr[i];
                    if(e == valor){
                        return {valor:i,tipo:"int"};
                    }
                }
                return {valor:-1,tipo:"int"};
        }
    }

    /**
     * @type {BaseVisitor['visitDeclFuncion']}
     */
    visitDeclFuncion(node) {

        const noParams = node.params.map(param=> param.id);
        const unico = new Set(noParams);

        if(noParams.length != unico.size){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`Los parámetros de la función no son únicos`);
            errores.push(err);
        }

        const funcion = new Foreign(node, this.entornoActual);

        console.log(this.entornoActual)
        this.entornoActual.setVariable(node.tipo,node.id,funcion,node.location.start.line,node.location.start.column);

    }

    /**
     * @type {BaseVisitor['visitLlamada']}
     */
    visitLlamada(node) {
        const funcion = node.callee.accept(this).valor;
        const args = node.args.map(arg => arg.accept(this));

        if(!(funcion instanceof Invocar)){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El identificador no es una función`);
            errores.push(err);
        }
        
        if(funcion.aridad().length !== args.length){
            let err = new SemanticError(node.location.start.line,node.location.start.column,`El número de argumentos no coincide con el número de parámetros`);
            errores.push(err);
        }

        args.forEach((arg, indice) => {
            const tipo = funcion.aridad()[indice]
            if(tipo.tipo != arg.tipo){
                let err = new SemanticError(node.location.start.line,node.location.start.column,`El tipo de argumento no coincide con el tipo de parámetro`);
                errores.push(err);
            }
        })

        return funcion.invocar(this,args);

    }

    /**
     * @type {BaseVisitor['visitSwitch']}
     */
    visitSwitch(node) {
        const condicion = node.exp.accept(this);
        let bandera = false;

        try {
            node.cases.forEach(caso => {
                const entornoAnterior = this.entornoActual;
                this.entornoActual = new Entorno(entornoAnterior);

                if (condicion.valor == caso.exp.accept(this).valor || bandera) {
                    bandera = true;

                    caso.stmt.forEach(stmt => {
                        try {
                            stmt.accept(this);
                        } catch (e) {
                            if (e instanceof BreakException) {
                                throw e; // Salir del switch
                            } else {
                                throw e; // Propagar cualquier otra excepción
                            }
                        }
                    });
                }

                this.entornoActual = entornoAnterior;
            });

            if (node.defa) {
                if (!bandera) { // Si nunca se activó un caso, ejecutar default
                    node.defa.forEach(sentencia => sentencia.accept(this));
                } else { // Si se activó un caso, incluir default en el fall-through
                    try {
                        node.defa.forEach(sentencia => sentencia.accept(this));
                    } catch (e) {
                        if (e instanceof BreakException) {
                            return; // Salir del switch por un break
                        }
                        throw e; // Propagar cualquier otra excepción no manejada
                    }
                }
            }
        } catch (e) {
            if (e instanceof BreakException) {
                return; // Manejo de la salida del switch por un break
            }
            throw e; // Propagar cualquier otra excepción no manejada
        }
    }

}

