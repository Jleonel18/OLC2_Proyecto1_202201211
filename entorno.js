import { SemanticError } from "./transfer.js";

export class Entorno {
    constructor(padre = undefined) {
        this.valores = {}
        this.padre = padre
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {

        if(this.valores[nombre] != undefined) {
            throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} ya definida`)
        }

        this.valores[nombre] = {valor,tipo}
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const valorAct = this.valores[nombre];

        if(valorAct != undefined) {
            return valorAct;
        }

        if(!valorAct && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no definida`)
    }

/**
 * @param {string} nombre
 * @param {any} valor
 */
updateVariable(nombre, valor) {
    const valorAct = this.valores[nombre];

    //console.log("El tipo de la variable es: ", valorAct);
    //console.log("El tipo del valor es: ", valor.tipo);

    if (valorAct != undefined) {
        if (valorAct.tipo === "string" && valor.tipo !== "string") {
            throw new SemanticError('Indefinida','Indefinida',`El tipo de la variable ${nombre} es 'string' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "char" && valor.tipo !== "char") {
            throw new SemanticError('Indefinida','Indefinida',`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "int" && valor.tipo !== "int") {
            throw new SemanticError('Indefinida','Indefinida',`El tipo de la variable ${nombre} es 'int' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "float" && (valor.tipo !== "float" && valor.tipo !== "int")) {
            throw new SemanticError('Indefinida','Indefinida',`El tipo de la variable ${nombre} es 'float' y no coincide con el tipo del valor proporcionado.`)
        }

        if (valorAct.tipo === "boolean" && valor.tipo !== "boolean") {
            throw new SemanticError('Indefinida','Indefinida',`El tipo de la variable ${nombre} es 'boolean' y no coincide con el tipo del valor proporcionado.`)
        }

        // Asignar el valor si las condiciones se cumplen
        this.valores[nombre].valor = valor.valor;
        this.valores[nombre].tipo = valor.tipo; // Actualizar tipo si hay conversión implícita
        return;
    }

    // Si no se encuentra en el entorno actual, buscar en el entorno padre
    if (!valorAct && this.padre) {
        this.padre.updateVariable(nombre, valor);
        return;
    }

    throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no definida`)
}


    updateVariableArreglo(nombre,valor,indice){
        const actual = this.valores[nombre];

        if(actual != undefined){
            if('temp' in actual.valor){
                throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} es temporal`)
            }

            if(!Array.isArray(actual.valor))  throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no es un arreglo`);
            if(Array.isArray(actual.valor[indice.valor])) throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no es un arreglo de arreglos`);
            if(indice.valor >= actual.valor.length) throw new SemanticError('Indefinida','Indefinida',`Indice fuera de rango`);

            if(valor.tipo == "int" && actual.tipo == "float"){
                this.valores[nombre].valor[indice.valor] = valor.valor;
            }else if(actual.tipo != valor.tipo){
                throw new SemanticError('Indefinida','Indefinida',`Tipo de dato incorrecto para la variable ${nombre}`);
            }

            this.valores[nombre].valor[indice.valor] = valor.valor;
            return;

        }

        if(!actual && this.padre){
            this.padre.updateVariableArreglo(nombre,valor,indice);
            return;
        }

        throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no definida`);
    }

    updateVariableMatriz(nombre,valor,posicion){
        const act = this.valores[nombre];
        
        if(act!= undefined){
            if('temp' in act) throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} es temporal`);
        if(!Array.isArray(act.valor)) throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no es un arreglo`);

        let arregloPivote = act.valor;

        for(let i=0; i<posicion.length; i++){

            const expr = posicion[i];

            if(!Array.isArray(arregloPivote)) throw new SemanticError('Indefinida','Indefinida',`Variable ${nombre} no es un arreglo de arreglos`);

            if(expr.tipo !== "int") throw new SemanticError('Indefinida','Indefinida',`Indice de matriz no es entero`);

            if(expr.valor >= arregloPivote.length) throw new SemanticError('Indefinida','Indefinida',`Indice fuera de rango`);

            if(i === posicion.length -1){
                if(valor.tipo == "int" && act.tipo == "float"){
                    arregloPivote[expr.valor] = valor.valor;
                    return
                }else if(act.tipo != valor.tipo) throw new SemanticError('Indefinida','Indefinida',`Tipo de dato incorrecto para la variable ${nombre}`);
                arregloPivote[expr.valor] = valor.valor;
            }else{
                arregloPivote = arregloPivote[expr.valor];
            }
            
        }

        return;
        }

        if(!act && this.padre){
            this.padre.updateVariableMatriz(nombre,valor,posicion);
            return;
        }

        

    }

}