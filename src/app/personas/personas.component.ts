import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Persona } from '../persona.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) { }

  // Inicializar arreglos
  ngOnInit(): void {
    this.personaService.obtenerPersonas()
        .subscribe(
          (personasObtenidas: Persona[]) => {
            // cargamos los datos de personas obtenidas en el arreglo local
            this.personas = personasObtenidas; // arreglo local
            this.personaService.setPersonas(this.personas); // arreglo local de personas service
            console.log('personas obtenidas del subscriber: ' + this.personas);

          }
        );
  }

  irAgregar() {
    console.log('nos vamos a agregar');
    this.router.navigate(['./personas/agregar']);
  }

}
