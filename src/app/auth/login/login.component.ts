import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formPosted = false;

  public formLogin = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) { }

  login(){
    this.usersService.logueo(this.formLogin.value)
      .subscribe(resp => {
        if (this.formLogin.get('remember').value) {
          localStorage.setItem('email', this.formLogin.get('email').value);
        }else{
          localStorage.removeItem('email');
        }

        // Navigate to contacts
        this.router.navigateByUrl('/');

      }, (err) => {
        // If an error happens
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      });
  }
}
