const { guardarInfo, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pause, leer, listadoTareasBorrar, confirmar, listadoTareasEditar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');
console.clear();


const main = async () => {
    let opt = '';

    const tareas = new Tareas();
    const tareasDb = leerDb();

    if (tareasDb) {
        tareas.cargarTareas(tareasDb)
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':

                const desc = await leer('Descripción: ');
                tareas.crearTarea(desc)

                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3': //pendientes
                tareas.listarTareasFiltro();
                break;
            case '4': //completas
                tareas.listarTareasFiltro(true);
                break;
            case '5': //completar tarea
                const ids = await listadoTareasEditar(tareas.listadoArr);
                tareas.editarTarea( ids )
                break;
            case '6': //eliminar
                const id = await listadoTareasBorrar(tareas.listadoArr)

                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    (ok) ? tareas.borrarTarea(id) : console.log('Operacion cancelada'.red.bold)
                }

                break;
        }

        guardarInfo(tareas.listadoArr);

        (opt !== '7') && await pause(); console.clear();

    } while (opt !== '7');


};

main();
