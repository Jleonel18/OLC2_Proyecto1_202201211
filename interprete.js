import { Entorno } from "./entorno.js";
import { BaseVisitor } from "./visitor.js";
import nodos,{ Expresion } from "./nodos.js";
import { BreakException, ContinueException, SemanticError } from "./transfer.js";

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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
                case '/':
                    // Verifica si el divisor es cero antes de realizar la división
                    if (der.valor === 0) {
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede dividir por cero`);
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
                            throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '%': 
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor % der.valor, tipo: "int" };
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
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
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '&&':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        return { valor: izq.valor && der.valor, tipo: "boolean" };
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '||':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "boolean-boolean":
                        return { valor: izq.valor || der.valor, tipo: "boolean" };
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '+=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor + der.valor, tipo: "int" };
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor + der.valor, tipo: "float" };
                    case "string-string":
                        return { valor: izq.valor + der.valor, tipo: "string" };
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '-=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor - der.valor, tipo: "int" };
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor - der.valor, tipo: "float" };
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            default: throw new SemanticError(node.location.start.line,node.location.start.column,`Operador desconocido: ${node.op}`);
        }
    }
    
    /**
    *@type {BaseVisitor['visitOperacionUnaria']} 
    */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);
        switch(node.op) {
            case '-': 
                switch(exp.tipo){
                    case "int":
                        return {valor: -exp.valor, tipo: exp.tipo}
                    case "float":
                        return {valor: -exp.valor, tipo: exp.tipo}
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case '!':
                switch(exp.tipo){
                    case "boolean":
                        return {valor: !exp.valor, tipo: exp.tipo}
                    default:
                        throw new SemanticError(node.location.start.line,node.location.start.column,`No es valida esa operacion`);
                }
            case 'typeof':
                //console.log("el tipo es:",exp.tipo)
                return {valor:exp.tipo ,tipo:'string'};
            case 'toString':
                return {valor:exp.valor.toString(),tipo:'string'};
            case 'toUpperCase':

                if(exp.tipo != "string"){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a mayúsculas un valor que no es de tipo string`);
                }

                return {valor:exp.valor.toUpperCase(),tipo:'string'};

            case 'toLowerCase':

                if(exp.tipo != "string"){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a minúsculas un valor que no es de tipo string`);
                }

                return {valor:exp.valor.toLowerCase(),tipo:'string'};
            
            case 'parseInt':
                // Verificar si exp.tipo es "string"
                if (exp.tipo === "string") {
                    // Intentar convertir el string a float primero
                    const num = parseFloat(exp.valor);
            
                    // Verificar si el valor convertido es un número y no tiene letras
                    if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(exp.valor)) {
                        // Convertir a int redondeando hacia abajo
                        return { valor: Math.floor(num), tipo: 'int' };
                    }
                }
            
                // Si no se puede convertir
                throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a int`);
                
            case 'parseFloat':
                // Verificar si el tipo es "string"
                if (exp.tipo === "string") {
                    // Intentar convertir el string a float
                    const num = parseFloat(exp.valor);
                
                    // Verificar si el valor convertido es un número y el string original es un número válido
                    if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(exp.valor)) {
                        return { valor: num, tipo: 'float' };
                    }
                }
                
                // Si no se puede convertir
                throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede convertir a float`);

            default: 
                throw new SemanticError(node.location.start.line,node.location.start.column,`Operador desconocido: ${node.op}`);
        }
    }

    /**
     * @type {BaseVisitor['visitTernario']}
     */
    visitTernario(node) {
        const condicion = node.condi.accept(this);

        if(condicion.tipo != "boolean"){
            throw new SemanticError(node.location.start.line,node.location.start.column,`La condición del operador ternario debe ser de tipo boolean`);
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

        if (tipoVar === "int") {
            if (tipoVar !== valor.tipo) {
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
            }
            this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
        } else if (tipoVar === "float") {
            if (tipoVar !== valor.tipo && valor.tipo !== "int") {
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
            }
            this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
        } else if (tipoVar === "string") {
            if (tipoVar !== valor.tipo) {
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
            }
            this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
        } else if (tipoVar === "boolean") {
            if (tipoVar !== valor.tipo) {
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
            }
            this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
        } else if (tipoVar === "char") {
            if (tipoVar !== valor.tipo) {
                throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo del valor no coincide con el tipo ${tipoVar}`);
            }
            this.entornoActual.setVariable(tipoVar, nombreVar, valor.valor);
        } else {
            throw new SemanticError(node.location.start.line,node.location.start.column,`Tipo ${tipoVar} no es valido`);
        }
        
        return;
    }

    let valorPredeterminado;
    switch (tipoVar) {
        case "int":
        case "float":
            valorPredeterminado = 0; // Asigna 0 tanto para int como para float
            break;
        case "char":
            valorPredeterminado = ''; // Asigna un carácter vacío para char
            break;
        case "string":
            valorPredeterminado = ""; // Asigna una cadena vacía para string
            break;
        case "boolean":
            valorPredeterminado = true; // Asigna true para boolean
            break;
        default:
            throw new SemanticError(node.location.start.line,node.location.start.column,`Tipo ${tipoVar} no es valido`);
    }

    this.entornoActual.setVariable(tipoVar, nombreVar, valorPredeterminado);
}


/**
 * @type {BaseVisitor['visitDeclaracionVariable']}
 */
visitDeclaracionVariable(node) {
    const nombreVariable = node.id;
    
    // Verificar si hay una expresión asignada
    if (!node.exp) {
        throw new SemanticError(node.location.start.line,node.location.start.column,`La variable ${nombreVariable} no tiene una expresión asignada`);
    }

    // Evaluar la expresión para obtener el valor y el tipo
    const valorVariable = node.exp.accept(this);
    
    // Asignar la variable con el tipo y valor deducidos
    this.entornoActual.setVariable(valorVariable.tipo, nombreVariable, valorVariable.valor);
}

    
    /**
     * @type {BaseVisitor['visitReferenciaVariable']}
     */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id
        const valorVariable = this.entornoActual.getVariable(nombreVariable)

        //console.log("el valor de la variable es: ", valorVariable);
        
        return {valor: valorVariable.valor, tipo: valorVariable.tipo};
    }

    /**
     * @type {BaseVisitor['visitIncremento']}
     */
    visitIncremento(node){
        const nombreVariable = node.id;
        const valorVariable = this.entornoActual.getVariable(nombreVariable);
        //console.log("el tipo de variable es:",valorVariable.tipo)
        if(valorVariable.tipo != "int" && valorVariable.tipo != "float"){
            throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede incrementar una variable que no es de tipo int o float`);
        }

        this.entornoActual.updateVariable(nombreVariable,{valor: valorVariable.valor + 1, tipo: valorVariable.tipo});
        return {valor:valorVariable.valor + 1 , tipo: valorVariable.tipo};
    }

    /**
     * @type {BaseVisitor['visitDecremento']}
     */
    visitDecremento(node){

        const nombreVariable = node.id;
        const valorVariable = this.entornoActual.getVariable(nombreVariable);
        //console.log("el tipo de variable es:",valorVariable.tipo)
        if(valorVariable.tipo != "int" && valorVariable.tipo != "float"){
            throw new SemanticError(node.location.start.line,node.location.start.column,`No se puede incrementar una variable que no es de tipo int o float`);
        }

        this.entornoActual.updateVariable(nombreVariable,{valor: valorVariable.valor - 1, tipo: valorVariable.tipo});
        return {valor:valorVariable.valor - 1 , tipo: valorVariable.tipo};
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
     * @type {BaseVisitor['visitAsignacionArreglo']}
     */
    visitAsignacionArreglo(node) {
        const valor = node.asg.accept(this);
        const pos = node.pos.map(p => p.accept(this));

        if(pos.length ==1){

            const expresion = pos[0];

            if(expresion.tipo != "int" || expresion.valor <0){
                throw new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero positivo y un entero`);
            }

            this.entornoActual.updateVariableArreglo(node.id,valor,expresion);
            return valor;

        }

        if(pos.length > 1){
            pos.forEach(p => {
                if(p.tipo != "int" || p.valor <0){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`La posición del arreglo no es un entero positivo y un entero`);
                }
            });

            this.entornoActual.updateVariableMatriz(node.id,valor,pos);
            return valor;

        }

        this.entornoActual.updateVariable(node.id,valor);
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
        if(node.accept(this)){
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
            throw new SemanticError(node.location.start.line,node.location.start.column,`Los elementos del arreglo no son del mismo tipo`);
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
                    throw new SemanticError(node.location.start.line,node.location.start.column,`El valor a asignar no es un valor`);
                }

                if(tipo == "float" && vals.tipo == "int") {
                    pivote.push(parseFloat(v));
                }else if (tipo != vals.tipo){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
                }else{
                    pivote.push(v);
                }

            })

            this.entornoActual.setVariable(tipo, identificador, pivote);

        }else{

            const dimens = node.tmn.length;
            let pivote = [];

            vals.valor.forEach( v=>{

                if(!Array.isArray(v)){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`El valor a asignar no es un arreglo`);
                }

                if(tipo == "float" && vals.tipo == "int"){
                    pivote.push(v);
                }else if(tipo != vals.tipo) {
                    throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
                }else{
                    pivote.push(v);
                }

            })

            if(!this.comprobarDimensiones(pivote,dimens)){
                throw new SemanticError(node.location.start.line,node.location.start.column,`Las dimensiones del arreglo no son correctas`);
            }

            this.entornoActual.setVariable(tipo, identificador, pivote);

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
            throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo de los arreglos no coincide`);
        }

        if(dimens != tamanos.length){
            throw new SemanticError(node.location.start.line,node.location.start.column,`Las dimensiones del arreglo no coinciden`);
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
            this.entornoActual.setVariable(tipo1,id,pivote);

        }else{

            tamanos.forEach(t =>{
                if(t.tipo != "int" || t.valor <0){
                    throw new SemanticError(node.location.start.line,node.location.start.column,`El tamaño del arreglo no es un entero positivo`);
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

            this.entornoActual.setVariable(tipo1,id,matrizAsignar(tamanos));

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
            throw new SemanticError(node.location.start.line,node.location.start.column,`El valor a copiar no es un arreglo`);
        }

        if(tipo == "float" && copiaArreglo.tipo == "int"){
            const copiar = [...copiaArreglo.valor];
            this.entornoActual.setVariable(tipo,id,copiar);
        }else if(tipo != copiaArreglo.tipo){
            throw new SemanticError(node.location.start.line,node.location.start.column,`El tipo de valor no coincide con el tipo del arreglo`);
        }else{
            const copiar = [...copiaArreglo.valor];
            this.entornoActual.setVariable(tipo,id,copiar);
        }

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

