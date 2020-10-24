import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Contact } from '../../../../models/contact.model';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  formPosted = false;

  totalContact: number = 0;
  contacts: Contact[] = [];
  temporaryContacts: Contact[] = [];

  from: number = 0;
  loading: boolean = true;

  public formRegistroC = this.fb.group({
    name: ['', [Validators.required]],
    surnames: [ '', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    phone: ['', [Validators.required]],
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  fieldNoValid(field: string): boolean {
    if (this.formRegistroC.get(field).invalid && this.formPosted) {
      return true;
    } else {
      return false;
    }
  }


  // tslint:disable-next-line: typedef
createContact(){
  this.formPosted = true;
  console.log(this.formRegistroC.value);

  if (this.formRegistroC.invalid) {
    return;
  }

  // Realizar el posteo.
  this.contactsService.createContact(this.formRegistroC.value)
    .subscribe(resp => {
      // Navegar al Dashboard
      this.router.navigateByUrl('/');
      Swal.fire({
        title: 'Saved',
        text: 'New contact added' ,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
    }, (err) => {
      // Si sucede un error
      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    });
}

}
