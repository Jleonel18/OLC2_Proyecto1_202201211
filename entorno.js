
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
            throw new Error(`Variable ${nombre} ya definida`)
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

        throw new Error(`Variable ${nombre} no definida`)
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
            throw new Error(`El tipo de la variable ${nombre} es 'string' y no coincide con el tipo del valor proporcionado.`);
        }

        if (valorAct.tipo === "char" && valor.tipo !== "char") {
            throw new Error(`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor proporcionado.`);
        }

        if (valorAct.tipo === "int" && valor.tipo !== "int") {
            throw new Error(`El tipo de la variable ${nombre} es 'int' y solo puede aceptar valores de tipo 'int'.`);
        }

        if (valorAct.tipo === "float" && (valor.tipo !== "float" && valor.tipo !== "int")) {
            throw new Error(`El tipo de la variable ${nombre} es 'float' y solo puede aceptar valores de tipo 'float' o 'int'.`);
        }

        if (valorAct.tipo === "boolean" && valor.tipo !== "boolean") {
            throw new Error(`El tipo de la variable ${nombre} es 'boolean' y no coincide con el tipo del valor proporcionado.`);
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

    throw new Error(`Variable ${nombre} no definida`);
}



}