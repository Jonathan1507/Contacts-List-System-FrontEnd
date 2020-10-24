import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  formProfile: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.user = usersService.user;
  }

  ngOnInit(): void {
    this.formProfile = this.fb.group({
      name: [this.user.name, Validators.required],
      surnames: [this.user.surnames, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

    // tslint:disable-next-line: typedef
    updateProfile(){
      this.usersService.updateUser(this.formProfile.value)
          .subscribe(() => {
            const {name, surnames, email} = this.formProfile.value;
            this.user.name = name;
            this.user.surnames = surnames;
            this.user.email = email;
            Swal.fire({
              title: 'Saved',
              text: 'The changes were made',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            });
          }, (err) => {
            Swal.fire({
              title: 'Failed to save changes',
              text: err.error.msg,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
            console.log(err.error.msg);
          });
    }
}
