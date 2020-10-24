import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Contact } from '../../../../models/contact.model';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [
  ]
})
export class UpdateComponent implements OnInit {

  formContact: FormGroup;
  contac: Contact;

  constructor(private fb: FormBuilder,
              private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.formContact = this.fb.group({
      names: [this.contac.name, Validators.required],
      surnames: [this.contac.surnames, Validators.required],
      email: [this.contac.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: [this.contac.phone, Validators.required],
    });
  }

      // tslint:disable-next-line: typedef
      updateContact(){
        this.contactsService.updateContact(this.formContact.value)
            .subscribe(() => {
              const {name, surnames, phone, email} = this.formContact.value;
              this.contac.name = name;
              this.contac.surnames = surnames;
              this.contac.email = email;
              this.contac.phone = phone;
              Swal.fire({
                title: 'Save',
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
