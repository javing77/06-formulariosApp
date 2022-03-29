import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre'    : new FormControl('Macbook'),
  //   'precio'    : new FormControl(1),
  //   'existencia': new FormControl(1)
  // })

  miFormulario: FormGroup = this.fb.group({
      nombre      : [ , [Validators.required, Validators.minLength(3)] ],
      precio      : [ , [Validators.required, Validators.min(0)] ],
      existencia  : [ , [Validators.required, Validators.min(0)] ],
  })

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {

    // Se usa el reset para establcer valores debido a que setvalue pide llenar todos los campos
    this.miFormulario.reset({
      nombre: '',  //Puede ser cualquier valor
      precio: 0
    })

  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if( this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched()
      return;
    }
    this.miFormulario.reset();

  }

}
