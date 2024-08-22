
export class Entorno {
    constructor(padre = undefined) {
        this.valores = {}
        this.padre = padre
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor) {

        if(this.valores[nombre] != undefined) {
            throw new Error(`Variable ${nombre} ya definida`)
        }

        this.valores[nombre] = valor
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

        if(valorAct != undefined) {
            this.valores[nombre] = valor;
            return;
        }

        if(!valorAct && this.padre) {
            this.padre.updateVariable(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`)
    }

}