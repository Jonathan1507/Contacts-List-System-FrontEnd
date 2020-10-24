import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Contact } from '../../../models/contact.model';
import { FormRegisterContact } from '../../../interfaces/register-contacts.interface';
import { SearchService } from '../../../services/search.service';
import { ContactsService } from '../../../services/contacts.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: [
  ]
})
export class ContactsComponent implements OnInit {

  totalContact: number = 0;
  contacts: Contact[] = [];
  temporaryContacts: Contact[] = [];

  since: number = 0;
  loading: boolean = true;

  constructor(private searchService: SearchService, private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.loadingContact();
  }

  loadingContact(){
    this.loading = true;
    this.contactsService.loadingContact()
      .subscribe( contacts => {
        this.loading = false;
        this.contacts = contacts;
    })
  }
/*
  saveChanges(contact: Contact){
    this.contactsService.updateContact(contact._id, contact.name, contact.surnames, contact.email, contact.phone)
      .subscribe(resp => {
        Swal.fire({
          title: 'Updated',
          text: contact.name,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      })
  }
*/

  deleteContact(contact: Contact){
    this.contactsService.deleteContact(contact._id)
      .subscribe(resp => {
        this.loadingContact();
        Swal.fire({
          title: 'Delete',
          text: contact.name,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      });
  }

}


