import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// Interfaces
import { LoadContacts } from '../interfaces/load-contacts.interface';
import { FormRegisterContact } from '../interfaces/register-contacts.interface';
import { Contact } from '../models/contact.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contact: Contact;
  constructor(private http: HttpClient){ }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get _id():string{
    return this.contact._id || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadContact(from: number = 0){
    const url = `${base_url}/contact?from=${from}`;
    return this.http.get<LoadContacts>(url, this.headers)
            .pipe(
              map( resp => {
                const contacts = resp.contacts.map(
                  contc => new Contact(contc.name, contc.surnames, contc.email, contc.phone)
                );
                return {
                  total: resp.total,
                  contacts
                };
              })
            );
  }

  createContact(data: FormRegisterContact){
    const url = `${base_url}/contact`;
    return this.http.post(url, data, this.headers);
  }

  updateContact(data: {name: string, surnames: string, email: string, phone: string}){
    data = {
      ...data
    };

    return this.http.put(`${base_url}/contact/${this._id}`, data, this.headers);
  }

  deleteContact(_id: string){
    const url = `${base_url}/contact/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
