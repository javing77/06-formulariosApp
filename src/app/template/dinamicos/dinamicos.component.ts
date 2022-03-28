import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  persona: Persona = {
    nombre: 'Javier',
    favoritos: [{ id: 1,
                  nombre: 'PC'},
                {
                  id: 2,
                  nombre: 'Games'
                }]
  }

  nuevoJuego: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    console.log('Formulario ejecutado');

  }

  validarNombre(): boolean{
    return this.miFormulario?.controls['nombre']?.invalid &&
          this.miFormulario?.controls['nombre']?.touched;
  }

  eliminar(i: number){
    this.persona.favoritos.splice(i, 1)
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push( {...nuevoFavorito} );
    this.nuevoJuego = '';

  }

}
