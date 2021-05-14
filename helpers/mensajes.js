require('colors');

const mostrarMenu = () => {

    return new Promise( ( resolve, reject )=>{

        console.clear();
        console.log('\t\t===================================='.yellow)
        console.log('\t\t\tSeleccione una opción')
        console.log('\t\t====================================\n'.yellow)
    
        console.log(`\t\t ${ '1.'.yellow } Crear una tarea`)
        console.log(`\t\t ${ '2.'.yellow } Listar Tareas`)
        console.log(`\t\t ${ '3.'.yellow } Listar Tareas pendientes`)
        console.log(`\t\t ${ '4.'.yellow } Listar Tareas completadas`)
        console.log(`\t\t ${ '5.'.yellow } Completar tarea(s)`)
        console.log(`\t\t ${ '6.'.yellow } Borrar una tarea`)
        console.log(`\t\t ${ '0.'.yellow } Salir\n`)
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question( '\t\t¿Qué opción seleccionará?: ', ( opt )=>{      
            readline.close();
            resolve(opt)
        });

    })
    
};

const pause = () => {
    
    return new Promise( (resolve)=> {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question( `\n\t\tPresione ${ 'Enter'.yellow.bold } para continuar`, ( )=>{
            readline.close();
            resolve()  
        });

    });

};


module.exports ={
    mostrarMenu,
    pause
}