import { SemanticError } from "./transfer.js";
import { errores } from "./index.js";

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
            let err = new SemanticError(linea,columna,`Variable ${nombre} ya definida`)
            errores.push(err);
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

        let err =  new SemanticError(linea,columna,`Variable ${nombre} no definida`)
        errores.push(err);
    }

/**
 * @param {string} nombre
 * @param {any} valor
 */
updateVariable(nombre, valor, linea, columna) {
    const valorAct = this.valores[nombre];

    if (valorAct != undefined) {
        if (valorAct.tipo === "int") {
            if (valor.tipo === "int") {
                // El tipo coincide sin conversión implícita
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].tipo = "int";
            } else {
                // Guardar null si el tipo no coincide
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
                this.valores[nombre].valor = null;
            }
        } else if (valorAct.tipo === "float") {
            if (valor.tipo === "float") {
                // El tipo coincide sin conversión implícita
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].tipo = "float";
            } else if (valor.tipo === "int") {
                // Permitir conversión implícita de int a float
                this.valores[nombre].valor = valor.valor; // Se guarda como float
                this.valores[nombre].tipo = "float"; // Tipo actualizado a float
            } else {
                // Guardar null si el tipo no coincide
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
                this.valores[nombre].valor = null;
            }
        } else if (valorAct.tipo === "boolean") {
            if (valor.tipo === "boolean") {
                // El tipo coincide sin conversión implícita
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].tipo = "boolean";
            } else {
                // Guardar null si el tipo no coincide
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
                this.valores[nombre].valor = null;
            }
            
        } else if (valorAct.tipo === "char") {
            if (valor.tipo === "char") {
                // El tipo coincide sin conversión implícita
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].tipo = "char";
            } else {
                // Guardar null si el tipo no coincide
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
                this.valores[nombre].valor = null;
            }
        } else if (valorAct.tipo === "string") {
            if (valor.tipo === "string") {
                // El tipo coincide sin conversión implícita
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].tipo = "string";
            } else {
                // Guardar null si el tipo no coincide
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
                this.valores[nombre].valor = null;
            }
        } else {
            // Guardar null si el tipo no coincide
            let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
            errores.push(err);
            this.valores[nombre].valor = null;
        }

        this.valores[nombre].linea = linea;
        this.valores[nombre].columna = columna;
        return;
    }

    // Si no se encuentra en el entorno actual, buscar en el entorno padre
    if (!valorAct && this.padre) {
        this.padre.updateVariable(nombre, valor, linea, columna);
        return;
    }

    let err = new SemanticError(linea, columna, `Variable ${nombre} no definida`);
    errores.push(err);
}

/**
 * @param {string} nombre
*/
eliminarTemporal(nombre,linea,columna) {
    if (this.valores[nombre] !== undefined) {
        delete this.valores[nombre];

    } else if (this.padre) {

        this.padre.eliminarTemporal(nombre,linea,columna);
    } else {
        let err = new SemanticError(linea,columna,`Variable ${nombre} no definida`);
        errores.push(err);

    }
}

/*updateVariable(nombre, valor,linea,columna) {
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
}*/


    updateVariableArreglo(nombre,valor,indice,linea,columna){
        const actual = this.valores[nombre];

        if(actual != undefined){

            if(!Array.isArray(actual.valor)){
                let err = new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo`);
                errores.push(err);
            }
            if(Array.isArray(actual.valor[indice.valor])){

                let err = new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo de arreglos`);
                errores.push(err);
            }
            if(indice.valor >= actual.valor.length) {
                let err= new SemanticError(linea,columna,`Indice fuera de rango`);
                errores.push(err)
            }

            if(valor.tipo == "int" && actual.tipo == "float"){
                this.valores[nombre].valor[indice.valor] = valor.valor;
            }else if(actual.tipo != valor.tipo){
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
            }

            this.valores[nombre].valor[indice.valor] = valor.valor;
            return;

        }

        if(!actual && this.padre){
            this.padre.updateVariableArreglo(nombre,valor,indice,linea,columna);
            return;
        }

        let err = new SemanticError(linea,columna,`Variable ${nombre} no definida`);
        errores.push(err);
    }

    updateVariableMatriz(nombre,valor,posicion,linea,columna){
        const act = this.valores[nombre];
        
        if(act!= undefined){
        if(!Array.isArray(act.valor)) {
            let err = new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo`);
            errores.push(err);
    }

        let arregloPivote = act.valor;

        for(let i=0; i<posicion.length; i++){

            const expr = posicion[i];

            if(!Array.isArray(arregloPivote)){
                let err = new SemanticError(linea,columna,`Variable ${nombre} no es un arreglo de arreglos`);
                errores.push(err);
            }

            if(expr.tipo !== "int"){
                let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                errores.push(err);
            }

            if(expr.valor >= arregloPivote.length){
                let err = new SemanticError(linea,columna,`Indice fuera de rango`);
                errores.push(err);
            }

            if(i === posicion.length -1){
                if(valor.tipo == "int" && act.tipo == "float"){
                    arregloPivote[expr.valor] = valor.valor;
                    return
                }else if(act.tipo != valor.tipo){
                    let err = new SemanticError(linea,columna,`Tipo de dato incorrecto para la variable ${nombre}`);
                    errores.push(err);
                }
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