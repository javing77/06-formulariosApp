import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group(
    {
      nombre    : [ , [Validators.required, Validators.minLength(3) ] ] ,
      favoritos : this.fb.array( [
        ['Metal Gear', Validators.required],
        ['Prueba', Validators.required]
      ], Validators.required)
    }

  );

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string){
    return this.miFormulario.controls[campo].errors &&
          this.miFormulario.controls[campo].touched;
  }

  borrar(i: number){
      this.favoritosArr.removeAt(i)
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ) {return;}

    // Estas lineas hacen lo mismo
    // this.favoritosArr.push(  new FormControl(this.nuevoFavorito.value, Validators.required) );
    this.favoritosArr.push(  this.fb.control(this.nuevoFavorito.value, Validators.required) );

    this.nuevoFavorito.reset();

  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
    }

    console.log(this.miFormulario.controls['nombre'].value ) ;


  }

}
