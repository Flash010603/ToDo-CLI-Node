const inquirer = require('inquirer')
require('colors')

const options = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer: ',
        choices: [
            {
                value: '1',
                name: `${ '1'.cyan.bold }. Crear una tarea`
            },
            {
                value: '2',
                name: `${ '2'.cyan.bold }. Listar Tareas`
            },
            {
                value: '3',
                name: `${ '3'.cyan.bold }. Listar Tareas pendientes`
            },
            {
                value: '4',
                name: `${ '4'.cyan.bold }. Listar Tareas completadas`
            },
            {
                value: '5',
                name: `${ '5'.cyan.bold }. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6'.cyan.bold }. Borrar una tarea`
            },
            {
                value: '7',
                name: `${ '7'.cyan.bold }. Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear();
    console.log('\t\t===================================='.yellow)
    console.log('\t\t\tSeleccione una opción')
    console.log('\t\t====================================\n'.yellow)

    const {opcion} = await inquirer.prompt(options);

    return opcion;

};

const pause = async() => {
    
    console.log();

    const { opcion } = await inquirer.prompt([{
        type: 'input',
        name: 'opcion',
        message: `Presione ${'Enter'.yellow.bold } para continuar`
    }]);
    
    return opcion;
};

const leer = async( message ) => {
     
    const { opcion } = await inquirer.prompt([{
        type: 'input',
        name: 'opcion',
        message,
        validate( value ){
            if(value.length === 0) return 'Porfavor ingrese un valor' 
            else return true
            
        }
    }]);

    return opcion
    
};

const listadoTareasBorrar = async( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        return {
            value: tarea.id,
            name: `${i+1}.`.green + ` ${tarea.desc}`
        }
    });

    choices.unshift( {
        value: '0',
        name: '0. Cancelar'.red.bold
    })

    const { id } = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Cual desea borrar: ',
        choices 
    }]);

    return id;
};

const listadoTareasEditar = async( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {

        return {
            value: tarea.id,
            name: `${i+1}.`.green + ` ${tarea.desc}`,
            checked: tarea.completada
        }
    });


    const { ids } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione las tareas que ha completado: ',
        choices 
    }]);

    return ids;
};

const confirmar = async(message) => {

    const { opcion } = await inquirer.prompt([{
        type: 'confirm',
        name: 'opcion',
        message 
    }]);

    return opcion
};

module.exports = {
    inquirerMenu,
    pause,
    leer,
    listadoTareasBorrar,
    confirmar,
    listadoTareasEditar
}