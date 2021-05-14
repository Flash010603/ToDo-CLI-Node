const { v4:uuidv4 }= require('uuid');

class Tarea {

	id= '';
	desc = '';
	completada = false;
	fecha_creacion= ''
	fecha_terminado= ''

	constructor( desc ){
		this.id = uuidv4();
		this.desc = desc
		this.fecha_creacion = new Date().toLocaleDateString();
	}

	
	
}

module.exports = Tarea;
