import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { DataService } from './data-service';

@Injectable()
export class PersonaService {
  // Arreglo para la lista de personas
  personas: Persona[] = [];

  constructor(private dataService: DataService ) {}

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }

  obtenerPersonas() {
    return this.dataService.cargarPersonas();
  }

  agregarPersona(persona: Persona) {
    console.log('Persona a Agregar' + persona.nombre);
    this.dataService.agregarPersona(persona)
      .subscribe(
        (persona: Persona) => {
          // Recuperamos objeto con el idPersona recien agregado
          console.log('Se agrega al arreglo la persona recien insertada suscriber:' + persona.idPersona);
          this.personas.push(persona);
        }
      );
  }


  encontrarPersona(id: number){
    const persona: Persona = this.personas.find( persona => persona.idPersona == id);// cuando el id sea igual
    console.log('Persona encontrada:' + persona.idPersona + ' ' + persona.nombre);
    return persona;
  }

  modificarPersona(id: number, persona: Persona) {
    console.log('persona a modificar:' + persona.idPersona);
    // Actualizar el objeto persona del arreglo local
    const personaModificadaLocal = this.personas.find(persona => persona.idPersona == id);
    personaModificadaLocal.idPersona = persona.idPersona;
    personaModificadaLocal.nombre = persona.nombre;

    this.dataService.modificarPersona(id, persona);
  }

  eliminarPersona(id: number) {
    console.log('eliminar persona con id:' + id);

    const index = this.personas.findIndex( persona => persona.idPersona == id); // encontreamos el indice en el arreglo

    this.personas.slice(index, 1); // eliminar localmente
    this.dataService.eliminarPersona(id); // eliminar en el servidor
  }

}
