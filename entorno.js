
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
            return valorAct.valor;
        }

        if(!valorAct && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Variable ${nombre} no definida`)
    }

    /**
     * @param {string} nombre
     * @returns {string} tipo de la variable
     */
    getTipoVariable(nombre) {
        const valorAct = this.valores[nombre];

        if (valorAct !== undefined) {
            return valorAct.tipo;
        }

        if (!valorAct && this.padre) {
            return this.padre.getTipoVariable(nombre);
        }

        throw new Error(`Tipo de la variable ${nombre} no definido`);
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    updateVariable(nombre, valor) {
        const valorAct = this.valores[nombre];

        if(valorAct != undefined) {
            this.valores[nombre].valor = valor;
            return;
        }

        if(!valorAct && this.padre) {
            this.padre.updateVariable(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`)
    }

}