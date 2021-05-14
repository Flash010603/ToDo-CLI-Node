const Tarea = require('./tarea')
require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const lista = []

        Object.keys(this._listado).forEach(key => lista.push(this._listado[key]))

        return lista;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareas(tareas = []) {

        tareas.forEach(tarea => this._listado[tarea.id] = tarea)
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea

    }

    borrarTarea(id) {
        if (id) {
            delete this._listado[id];
            console.log('Operacion completada, la tarea fue borrada'.green.bold)
        }
    }

    editarTarea(listaIds = []) {

        listaIds.forEach((id, i) => {

            const tarea = this._listado[id]
            if (!tarea.completada) {
                tarea.fecha_terminado = new Date().toLocaleDateString();
                tarea.completada = true;
            }
        })
        
        

        this.listadoArr.forEach( tarea =>{

            if( !listaIds.includes(tarea.id) ){
                const tareas = this._listado[tarea.id]
                tareas.fecha_terminado = '';
                tareas.completada = false;
            }
            
        })

    }

    listadoCompleto() {
        console.log()
        this.formatoListado(this.listadoArr)
    }

    listarTareasFiltro(completa = false) {
        console.log();
        const lista = this.listadoArr.filter(t => t.completada === completa);

        if (lista.length === 0) {
            const tipo = (completa) ? 'Completadas' : 'Pendientes'
            console.log('\t===== ' + `No hay tareas ${tipo}`.green.bold + ' =====')

            return;
        }

        this.formatoListado(lista)
    }

    formatoListado(lista = []) {
        
    
        lista.forEach((tarea, i) => {

            console.log(`${i + 1}`.yellow + `.'${tarea.desc}'`.yellow.bold)
            console.log(`\tEstado: ${(!tarea.completada) ? 'Pendiente'.red.bold : 'Completada'.green.bold}`)
            console.log(`\tCreado el: ${tarea.fecha_creacion}`)

            if (tarea.fecha_terminado !== '') {
                console.log(`\tTerminado el: ${tarea.fecha_terminado }\n`)
            } else {
                console.log()
            }
        })
    }

}

module.exports = Tareas