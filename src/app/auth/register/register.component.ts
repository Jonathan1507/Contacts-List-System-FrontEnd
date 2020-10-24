import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formPosted = false;

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) { }

  public formRegister = this.fb.group({
    name: ['', [Validators.required]],
    surnames: [ '', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terms: [ false, [Validators.required]]
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  // tslint:disable-next-line: typedef
  createUser(){
    this.formPosted = true;
    console.log(this.formRegister.value);

    if (this.formRegister.invalid) {
      return;
    }

    this.usersService.createUser(this.formRegister.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      });
  }

  fieldNoValid(field: string): boolean {
    if (this.formRegister.get(field).invalid && this.formPosted) {
      return true;
    } else {
      return false;
    }
  }

  passwordNoValid(){
    const passw1 = this.formRegister.get('password').value;
    const passw2 = this.formRegister.get('password2').value;

    if ((passw1 !== passw2) && this.formPosted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms(){
    return !this.formRegister.get('terms').value && this.formPosted;
  }

  samePasswords(contra1Name: string, contra2Name: string){
    return (formGroup: FormGroup) => {
      const contra1Control = formGroup.get(contra1Name);
      const contra2Control = formGroup.get(contra2Name);

      if (contra1Control.value === contra2Control.value) {
        contra2Control.setErrors(null);
      } else {
        contra2Control.setErrors({noEsIgual: true});
      }
    }
  }
}
