import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Contact } from '../../../models/contact.model';
import { SearchService } from '../../../services/search.service';
import { ContactsService } from '../../../services/contacts.service';

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

  from: number = 0;
  loading: boolean = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private searchService: SearchService, 
              private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.loadingContact();
  }

  loadingContact(){
    this.loading = true;
    this.contactsService.loadContact(this.from)
      .subscribe( ({total, contacts}) => {
        this.totalContact = total;
        this.contacts = contacts;
        this.temporaryContacts = contacts;
        this.loading = false;
    });
  }

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

  changePage(value: number){
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    }else if(this.from >= this.totalContact){
      this.from -= value;
    }
    this.loadingContact();
  }

  search(finished: string){
    if (finished.length === 0) {
      return this.contacts = this.temporaryContacts;
    }

    this.searchService.search('contacts', finished)
      .subscribe(results => {
        this.contacts = results;
      });
  }

}


