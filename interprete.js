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
                        throw new Error('No es valida esa operacion');
                }
            case '-=':
                switch (`${izq.tipo}-${der.tipo}`) {
                    case "int-int":
                        return { valor: izq.valor - der.valor, tipo: "int" };
                    case "float-int":
                    case "float-float":
                        return { valor: izq.valor - der.valor, tipo: "float" };
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
                switch(exp.tipo){
                    case "int":
                        return {valor: -exp.valor, tipo: exp.tipo}
                    case "float":
                        return {valor: -exp.valor, tipo: exp.tipo}
                    default:
                        throw new Error(`No es valida la operación`)
                }
            case '!':
                switch(exp.tipo){
                    case "boolean":
                        return {valor: !exp.valor, tipo: exp.tipo}
                    default:
                        throw new Error(`Solamente se pueden negar operadores lógicos`)
                }
            case 'typeof':
                //console.log("el tipo es:",exp.tipo)
                return {valor:exp.tipo ,tipo:'string'};
            case 'toString':
                return {valor:exp.valor.toString(),tipo:'string'};
            case 'toUpperCase':

                if(exp.tipo != "string"){
                    throw new Error(`No se puede convertir a mayúsculas un valor que no es de tipo string`);
                }

                return {valor:exp.valor.toUpperCase(),tipo:'string'};

            case 'toLowerCase':

                if(exp.tipo != "string"){
                    throw new Error(`No se puede convertir a minúsculas un valor que no es de tipo string`);
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
                throw new Error("No se puede convertir a int");
                
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
                throw new Error("No se puede convertir a float");

            default: 
                throw new Error(`Operador desconocido: ${node.operador}`);
        }
    }

    /**
     * @type {BaseVisitor['visitTernario']}
     */
    visitTernario(node) {
        const condicion = node.condi.accept(this);

        if(condicion.tipo != "boolean"){
            throw new Error(`La condición del operador ternario debe ser de tipo boolean`);
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
            throw new Error(`Tipo ${tipoVar} no es valido`);
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
        throw new Error(`Error semántico: La variable '${nombreVariable}' debe ser inicializada con un valor.`);
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
            throw new Error(`No se puede incrementar una variable que no es de tipo int o float`);
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
            throw new Error(`No se puede incrementar una variable que no es de tipo int o float`);
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
        console.log("Condicion: ", condicion.valor);
        
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
        while(node.cond.accept(this).valor) {
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

        while(node.cond.accept(this).valor) {
            //console.log("La condiciones:",node.cond.accept(this))
            node.stmt.accept(this);
            node.incremento.accept(this);
        }

        this.entornoActual = entornoAnterior;
    }

    /**
     * @type {BaseVisitor['visitArreglo']}
     */
    visitArreglo(node){
        let valores = [];
        const tipos = node.tipoDato;
        const ident = node.id;
        const l1 = node.arregloVal.d1
        const l2 = node.arregloVal.d2

        console.log("Los tipos de datos son:",tipos, "y",l1.tipo);

        if(tipos != l1.tipo){
            throw new Error(`El tipo de dato del arreglo no coincide con el tipo de dato de la declaración`);
        }
        valores.push(l1.valor);
        
        for(let i =0; i<l2.length; i++){
            const e = l2[i];
            if(tipos != e.tipo){
                throw new Error(`El tipo de dato del arreglo no coincide con el tipo de dato de la declaración`);
            }
            valores.push(e.valor);
        }

        this.entornoActual.setVariable(tipos,ident,valores);
        return

    }

    /**
     * @type {BaseVisitor['visitArregloVacio']}
     */
    visitArregloVacio(node){
        const tipo1  = node.tipoDato;
        const ident = node.id;
        const tipo2 = node.tipo2;
        const dimension = node.dimension.accept(this).valor;
        let valorALlenar;

        if(tipo1 != tipo2){
            throw new Error(`El tipo de dato del arreglo no coincide con el tipo de dato de la declaración`);
        }

        if(dimension < 0){
            throw new Error(`La dimensión del arreglo no puede ser negativa`);
        }

        if(tipo1 == "int"){
            valorALlenar = 0;
        }else if(tipo1 == "float"){
            valorALlenar = 0.0;
        }else if(tipo1 == "string"){
            valorALlenar = "";
        }else if(tipo1 == "boolean"){
            valorALlenar = true;
        }else if(tipo1 == "char"){
            valorALlenar = '';
        }else{
            throw new Error(`Tipo ${tipo1} no es valido`);
        }

        let valores = new Array(dimension).fill(valorALlenar);

        this.entornoActual.setVariable(tipo1,ident,valores);

        return;

    }

    /**
     * @type {BaseVisitor['visitCopiarArreglo']}
     */
    visitCopiarArreglo(node){

        const tipoDato = node.tipoDato;
        const idABuscar = node.id;
        const arregloCopiado = node.exp.accept(this);

        if(tipoDato != arregloCopiado.tipo){
            throw new Error(`El tipo de dato del arreglo no coincide con el tipo de dato de la declaración`);
        }

        const nuevoArreglo = arregloCopiado.valor.slice();

        this.entornoActual.setVariable(tipoDato,idABuscar,nuevoArreglo);
        
    }

    /**
     * @type {BaseVisitor['visitSwitch']}
     */
    visitSwitch(node) {
        const condicion = node.exp.accept(this);
        let bandera = false;

        node.cases.forEach(caso => {
            const entornoAnterior = this.entornoActual;
            this.entornoActual = new Entorno(entornoAnterior);
            if(condicion.valor == caso.exp.accept(this).valor || bandera){
                bandera = true;
                caso.stmt.forEach(stmt => {stmt.accept(this)});
            }

            this.entornoActual = entornoAnterior;

        });

        if(node.defa){
            node.defa.forEach(sentencia => sentencia.accept(this));
        }
    }

}

