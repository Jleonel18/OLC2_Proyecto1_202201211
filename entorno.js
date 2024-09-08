import { SemanticError } from "./transfer.js";

export class Entorno {

    static listaVariables = [];

    constructor(padre = undefined) {
        this.valores = {}
        this.padre = padre
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor,linea,columna) {

        if(this.valores[nombre] != undefined) {
            throw new SemanticError(linea,columna,`Variable ${nombre} ya definida`)
        }

        this.valores[nombre] = {valor,tipo,linea,columna};
        Entorno.listaVariables.push({tipo,nombre,valor,linea,columna});
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre,linea,columna) {
        const valorAct = this.valores[nombre];

        if(valorAct != undefined) {
            return valorAct;
        }

        if(!valorAct && this.padre) {
            return this.padre.getVariable(nombre,linea,columna);
        }

        throw new SemanticError(linea,columna,`Variable ${nombre} no definida`)
    }

/**
 * @param {string} nombre
 * @param {any} valor
 */
updateVariable(nombre, valor,linea,columna) {
    const valorAct = this.valores[nombre];

    if (valorAct != undefined) {
        if (valorAct.tipo === "string" && valor.tipo !== "string") {
            throw new SemanticError(linea,columna,`El tipo de la variable ${nombre} es 'string' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "char" && valor.tipo !== "char") {
            throw new SemanticError(linea,columna,`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "int" && valor.tipo !== "int") {
            throw new SemanticError(linea,columna,`El tipo de la variable ${nombre} es 'int' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "float" && (valor.tipo !== "float" && valor.tipo !== "int")) {
            throw new SemanticError(linea,columna,`El tipo de la variable ${nombre} es 'float' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "boolean" && valor.tipo !== "boolean") {
            throw new SemanticError(linea,columna,`El tipo de la variable ${nombre} es 'boolean' y no coincide con el tipo del valor proporcionado.`)
        }

        // Asignar el valor si las condiciones se cumplen
        this.valores[nombre].valor = valor.valor;
        this.valores[nombre].tipo = valor.tipo; // Actualizar tipo si hay conversión implícita
        this.valores[nombre].linea = linea;
        this.valores[nombre].columna = columna;
        return;
    }

    // Si no se encuentra en el entorno actual, buscar en el entorno padre
    if (!valorAct && this.padre) {
        this.padre.updateVariable(nombre, valor,linea,columna);
        return;
    }

    throw new SemanticError(linea,columna,`Variable ${nombre} no definida`)
}


    updateVariableArreglo(nombre,valor,indice,linea,columna){
        const actual = this.valores[nombre];

        if(actual != undefined){
            /*if('temp' in actual.valor){
                throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} es temporal`)
            }*/

            if(!Array.isArray(actual.valor))  throw new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo`);
            if(Array.isArray(actual.valor[indice.valor])) throw new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo de arreglos`);
            if(indice.valor >= actual.valor.length) throw new SemanticError(linea,columna,`Indice fuera de rango`);

            if(valor.tipo == "int" && actual.tipo == "float"){
                this.valores[nombre].valor[indice.valor] = valor.valor;
            }else if(actual.tipo != valor.tipo){
                throw new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
            }

            this.valores[nombre].valor[indice.valor] = valor.valor;
            return;

        }

        if(!actual && this.padre){
            this.padre.updateVariableArreglo(nombre,valor,indice,linea,columna);
            return;
        }

        throw new SemanticError(linea,columna,`Variable ${nombre} no definida`);
    }

    updateVariableMatriz(nombre,valor,posicion,linea,columna){
        const act = this.valores[nombre];
        
        if(act!= undefined){
            if('temp' in act) throw new SemanticError(linea,columna,`Variable ${nombre} es temporal`);
        if(!Array.isArray(act.valor)) throw new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo`);

        let arregloPivote = act.valor;

        for(let i=0; i<posicion.length; i++){

            const expr = posicion[i];

            if(!Array.isArray(arregloPivote)) throw new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo de arreglos`);

            if(expr.tipo !== "int") throw new SemanticError(linea,columna,`Indice de matriz no es entero`);

            if(expr.valor >= arregloPivote.length) throw new SemanticError(linea,columna,`Indice fuera de rango`);

            if(i === posicion.length -1){
                if(valor.tipo == "int" && act.tipo == "float"){
                    arregloPivote[expr.valor] = valor.valor;
                    return
                }else if(act.tipo != valor.tipo) throw new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                arregloPivote[expr.valor] = valor.valor;
            }else{
                arregloPivote = arregloPivote[expr.valor];
            }
            
        }

        return;
        }

        if(!act && this.padre){
            this.padre.updateVariableMatriz(nombre,valor,posicion,linea,columna);
            return;
        }

        

    }

}