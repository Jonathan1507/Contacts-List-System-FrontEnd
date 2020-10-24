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


  constructor(private http: HttpClient){ }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadingContact(since: number = 0){
    const url = `${base_url}/contact?since=${since}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, contacts: Contact[]}) => resp.contacts)
    );
  }

  createContact(formData: FormRegisterContact){
    const url = `${base_url}/contact`;
    return this.http.post(url, formData, this.headers);
  }

 /* updateContact(_id: string, name: string, surnames: string, email: string, phone: string){
    const url = `${base_url}/contact/${_id}`;
    return this.http.put(url, {name} , this.headers);
  }
*/
  deleteContact(_id: string){
    const url = `${base_url}/contact/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
