import { Entorno } from "./entorno.js";
import { errores } from "./index.js";
import { Invocar } from "./invocar.js";
import { DeclFuncion } from "./nodos.js";
import { BreakException, SemanticError, ReturnException, ContinueException } from "./transfer.js";

export class Foreign extends Invocar{

    constructor(nodo, clousure){
        super();
        /**
         * @type {DeclFuncion}
         */
        this.nodo = nodo;

        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad(){
        return this.nodo.params;
    }

    /**
     * 
     * @type {Invocar['invocar']}
     */
    invocar(interprete, args){
        const entornoNuevo = new Entorno(this.clousure);
        this.nodo.params.forEach((param, i) => {
            /*console.log("El param id es:", param.id);
            console.log("El param tipo es:", param.tipo);
            console.log("El param valor es:", args[i].valor);*/
            entornoNuevo.setVariable(param.tipo,param.id, args[i].valor,this.nodo.location.start.line,this.nodo.location.start.column);
        })

        const entornoAnteriorLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;

        try{
            this.nodo.bloque.accept(interprete);
        }catch(e){

            interprete.entornoActual = entornoAnteriorLlamada;


            
            if(e instanceof ReturnException){

                if(this.nodo.tipo =="void"){
                    return null;
                }


                if(this.nodo.tipo != e.value.tipo){
                    let err = new SemanticError(this.nodo.location.start.line, this.nodo.location.start.column, `La función ${this.nodo.id} debe retornar un valor de tipo ${this.nodo.tipo}`);
                    errores.push(err);
                }

                return e.value;
            }


            if(this.nodo.tipo != "void" && e instanceof BreakException){
                let err = new SemanticError(this.nodo.location.start.line, this.nodo.location.start.column, `La función ${this.nodo.id} debe retornar un valor`);
                errores.push(err);
            }

            if(this.nodo.tipo != "void" && e instanceof ContinueException){
                let err = new SemanticError(this.nodo.location.start.line, this.nodo.location.start.column, `La función ${this.nodo.id} debe retornar un valor`);
                errores.push(err);
            }

            throw e;

        }

        if(this.nodo.tipo != "void"){
            let err = new SemanticError(this.nodo.location.start.line, this.nodo.location.start.column, `La función ${this.nodo.id} debe retornar un valor`);
            errores.push(err);
        }

        interprete.entornoActual = entornoAnteriorLlamada;
        return null;

    }

}