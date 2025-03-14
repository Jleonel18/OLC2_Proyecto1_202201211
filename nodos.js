
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Primitivo extends Expresion {

    /**
    * @param {Object} options
    * @param {any} options.valor Valor primitivo
 * @param {string} options.tipo Tipo del valor primitivo
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor primitivo
         * @type {any}
        */
        this.valor = valor;


        /**
         * Tipo del valor primitivo
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrimitivo(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
 * @param {string} options.tipo Tipo de la variable
    */
    constructor({ id, exp, tipo }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Tipo de la variable
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condi Condicion del ternario
 * @param {Expresion} options.exp1 Expresion verdadera
 * @param {Expresion} options.exp2 Expresion falsa
    */
    constructor({ condi, exp1, exp2 }) {
        super();
        
        /**
         * Condicion del ternario
         * @type {Expresion}
        */
        this.condi = condi;


        /**
         * Expresion verdadera
         * @type {Expresion}
        */
        this.exp1 = exp1;


        /**
         * Expresion falsa
         * @type {Expresion}
        */
        this.exp2 = exp2;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}
    
export class TipoVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la variable
 * @param {string} options.id Identificador de la variable
 * @param {Expresion|undefined} options.exp Expresion de la variable
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * Tipo de la variable
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTipoVariable(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion[]} options.pos Posiciones del arreglo
    */
    constructor({ id, pos }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Posiciones del arreglo
         * @type {Expresion[]}
        */
        this.pos = pos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.outputs Expresion a imprimir
    */
    constructor({ outputs }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion[]}
        */
        this.outputs = outputs;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador variable a asignar
 * @param {Expresion} options.asgn Expresion a asignar
    */
    constructor({ id, asgn }) {
        super();
        
        /**
         * Identificador variable a asignar
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asgn = asgn;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class AsignacionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion[]} options.pos Posiciones del arreglo
 * @param {Expresion} options.asg Expresion a asignar
    */
    constructor({ id, pos, asg }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Posiciones del arreglo
         * @type {Expresion[]}
        */
        this.pos = pos;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asg = asg;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionArreglo(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.decl Sentencias de bloque
    */
    constructor({ decl }) {
        super();
        
        /**
         * Sentencias de bloque
         * @type {Expresion[]}
        */
        this.decl = decl;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del if
 * @param {Expresion} options.stmtT Sentencia del if
 * @param {Expresion | undefined} options.stmtElse Sentencia del else
    */
    constructor({ cond, stmtT, stmtElse }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Sentencia del if
         * @type {Expresion}
        */
        this.stmtT = stmtT;


        /**
         * Sentencia del else
         * @type {Expresion | undefined}
        */
        this.stmtElse = stmtElse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del while
 * @param {Expresion} options.stmt Sentencia del while
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Sentencia del while
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.inic Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.incremento Incremento del for
 * @param {Expresion} options.stmt Sentencia del for
    */
    constructor({ inic, cond, incremento, stmt }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.inic = inic;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.incremento = incremento;


        /**
         * Sentencia del for
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
 * @param {Expresion []} options.cases Casos del switch
 * @param {Expresion[]|undefined} options.defa Caso por defecto
    */
    constructor({ exp, cases, defa }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Casos del switch
         * @type {Expresion []}
        */
        this.cases = cases;


        /**
         * Caso por defecto
         * @type {Expresion[]|undefined}
        */
        this.defa = defa;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class Arreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.vls Expresiones del arreglo
    */
    constructor({ vls }) {
        super();
        
        /**
         * Expresiones del arreglo
         * @type {Expresion[]}
        */
        this.vls = vls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArreglo(this);
    }
}
    
export class ArregloVal extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.valores Valoers del arreglo
 * @param {string[]} options.tmn undefined
    */
    constructor({ tipo, id, valores, tmn }) {
        super();
        
        /**
         * Tipo del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Valoers del arreglo
         * @type {Expresion}
        */
        this.valores = valores;


        /**
         * undefined
         * @type {string[]}
        */
        this.tmn = tmn;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloVal(this);
    }
}
    
export class ArregloVacio extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo1 Tipo del arreglo
 * @param {string[]} options.tmn Dimensiones del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {string} options.tipo2 Tipo de los valores del arreglo
 * @param {Expresion[]} options.tamanos Tamaño del arreglo
    */
    constructor({ tipo1, tmn, id, tipo2, tamanos }) {
        super();
        
        /**
         * Tipo del arreglo
         * @type {string}
        */
        this.tipo1 = tipo1;


        /**
         * Dimensiones del arreglo
         * @type {string[]}
        */
        this.tmn = tmn;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Tipo de los valores del arreglo
         * @type {string}
        */
        this.tipo2 = tipo2;


        /**
         * Tamaño del arreglo
         * @type {Expresion[]}
        */
        this.tamanos = tamanos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloVacio(this);
    }
}
    
export class CopiarArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.exp Arreglo a copiar
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * Tipo del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Arreglo a copiar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCopiarArreglo(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a retornar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Incremento extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIncremento(this);
    }
}
    
export class Decremento extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDecremento(this);
    }
}
    
export class DeclFuncion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la funcion
 * @param {string[]} options.params Parametros de la funcion
 * @param {string} options.tipo Tipo de retorno de la funcion
 * @param {Bloque} options.bloque Bloque de la funcion
    */
    constructor({ id, params, tipo, bloque }) {
        super();
        
        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {string[]}
        */
        this.params = params;


        /**
         * Tipo de retorno de la funcion
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Bloque de la funcion
         * @type {Bloque}
        */
        this.bloque = bloque;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclFuncion(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Funcion a llamar
 * @param {Expresion[]} options.args Argumentos de la funcion
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * Funcion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la funcion
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export class ArregloFunc extends Expresion {

    /**
    * @param {Object} options
    * @param {any} options.id Identificador del arreglo
 * @param {string} options.op Operador del arreglo
 * @param {any | undefined} options.params Expresion del arreglo
    */
    constructor({ id, op, params }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {any}
        */
        this.id = id;


        /**
         * Operador del arreglo
         * @type {string}
        */
        this.op = op;


        /**
         * Expresion del arreglo
         * @type {any | undefined}
        */
        this.params = params;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloFunc(this);
    }
}
    
export class Struct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del struct
 * @param {Expresion} options.decl Declaraciones del struct
    */
    constructor({ id, decl }) {
        super();
        
        /**
         * Identificador del struct
         * @type {string}
        */
        this.id = id;


        /**
         * Declaraciones del struct
         * @type {Expresion}
        */
        this.decl = decl;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitStruct(this);
    }
}
    
export class RecStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador del struct
 * @param {Expresion[]} options.atrib Atributos del struct
    */
    constructor({ tipo, atrib }) {
        super();
        
        /**
         * Identificador del struct
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Atributos del struct
         * @type {Expresion[]}
        */
        this.atrib = atrib;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitRecStruct(this);
    }
}
    
export class InstanciaStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador del struct
 * @param {string} options.id Identificador de la estructura
 * @param {Expresion} options.instancia Instancia del struct
    */
    constructor({ tipo, id, instancia }) {
        super();
        
        /**
         * Identificador del struct
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la estructura
         * @type {string}
        */
        this.id = id;


        /**
         * Instancia del struct
         * @type {Expresion}
        */
        this.instancia = instancia;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitInstanciaStruct(this);
    }
}
    
export class Get extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objeto a obtener
 * @param {string} options.propiedad Propiedad a obtener
    */
    constructor({ objetivo, propiedad }) {
        super();
        
        /**
         * Objeto a obtener
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Propiedad a obtener
         * @type {string}
        */
        this.propiedad = propiedad;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitGet(this);
    }
}
    
export class Set extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.objetivo Objetivo de la operacion
 * @param {string} options.propiedad Identificador de la propiedad
 * @param {Expresion} options.valor Valor a asignar
    */
    constructor({ objetivo, propiedad, valor }) {
        super();
        
        /**
         * Objetivo de la operacion
         * @type {Expresion}
        */
        this.objetivo = objetivo;


        /**
         * Identificador de la propiedad
         * @type {string}
        */
        this.propiedad = propiedad;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSet(this);
    }
}
    
export class Foreach extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la lista
 * @param {string} options.id Identificador de la lista
 * @param {string} options.id2 Identificador de la variable
 * @param {Expresion} options.stmt Sentencia del foreach
    */
    constructor({ tipo, id, id2, stmt }) {
        super();
        
        /**
         * Tipo de la lista
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la lista
         * @type {string}
        */
        this.id = id;


        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id2 = id2;


        /**
         * Sentencia del foreach
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitForeach(this);
    }
}
    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Primitivo, DeclaracionVariable, Ternario, TipoVariable, ReferenciaVariable, Print, ExpresionStmt, Asignacion, AsignacionArreglo, Bloque, If, While, For, Switch, Arreglo, ArregloVal, ArregloVacio, CopiarArreglo, Break, Continue, Return, Incremento, Decremento, DeclFuncion, Llamada, ArregloFunc, Struct, RecStruct, InstanciaStruct, Get, Set, Foreach }
