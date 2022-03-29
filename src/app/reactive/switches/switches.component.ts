import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
      genero        : [ , Validators.required ],
      notificaciones: [ , Validators.required ],
      condiciones   : [ , [Validators.required, Validators.requiredTrue] ]
  });

  persona = {
    genero: 'M',
    notificaciones: false,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // no se usa setValue porque persona no tiene la propiedad personas y esto genera error
    this.miFormulario.reset( this.persona );
    // Otra forma de hacer que una propiedad tenga valor
    // this.miFormulario.reset( {
    //       ...this.persona,
    //       condiciones: false});


    // subscribirnos para que la persona cambien cuando se cambia en miFormulario
    this.miFormulario.valueChanges.subscribe( ({  condiciones, ...elResto}) => {
      //delete form.condiciones
      this.persona = elResto;
    })

    //Subscrinos a una propiedad en especifico
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newV => { })

  }

  guardar(){
    const formValue = { ...this.miFormulario.value }
    delete formValue.notificaciones;
    console.log(formValue);

    this.persona = formValue;

  }

}
