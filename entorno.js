
export class Entorno {
    constructor() {
        this.valores = {}
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor) {

        // Si ya existe la variable, lanzar error
        /*if(this.valores[nombre]) {
            throw new Error(`Variable ${nombre} ya definida`)
        }*/
        this.valores[nombre] = valor
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const valorAct = this.valores[nombre];

        if(valorAct) {
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

        if(valorAct) {
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