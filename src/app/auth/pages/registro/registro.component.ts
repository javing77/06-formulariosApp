import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { emailPattern, nombreApellidoPattern, noPuedeserStider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



// Si no se va a realizar una validacion async que utilice una peticion http se puede utilizar el
//tercer campo, miestrar regurese una promesa o un observable
  miFormulario: FormGroup = this.fb.group({
    nombre    : [ , [Validators.required, Validators.pattern(  this.validatorService.nombreApellidoPattern)] ],
    email     : [ , [Validators.required, Validators.pattern(  this.validatorService.emailPattern)], [this.emailValidator] ],
    username  : [ , [Validators.required, this.validatorService.noPuedeserStider] ],
    password  : [ , [Validators.required, Validators.minLength(6)] ],
    password2 : [ , [Validators.required] ],
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })

  constructor( private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
  }

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.['required'])
    {
      return 'Email es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Email no cumple con el formato'
    } else if (errors?.['emailTomado']){
      return 'El email ya fue tomado'
    }

    return '';

  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }


  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
