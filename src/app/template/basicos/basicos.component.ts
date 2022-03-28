import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {


  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'prueba',
    precio: 0,
    existencia: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls['producto']?.invalid &&
           this.miFormulario?.controls['producto']?.touched
  }

  // guardar(miFormulario: NgForm){
  guardar(){
    console.log(this.miFormulario);
    this.miFormulario.resetForm(
      {precio: 0, existencia:0}
    );

  }

  precioValido(): boolean{

      return this.miFormulario?.controls['precio']?.value < 0 &&
            this.miFormulario?.controls['precio']?.touched;
  }

}
