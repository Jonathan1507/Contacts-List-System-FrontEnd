import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

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

  private transformContacts(results: any[]): Contact[]{
    return results.map(
      contc => new Contact(contc.name, contc.surnames, contc.email, contc.phone)
    );
  }

  search(
    type: 'contacts',
    finished: string
  ){
    const url = `${base_url}/full/collection/${type}/${finished}`;
    return this.http.get<any[]>(url, this.headers)
                .pipe(
                  map((resp: any) => {
                    switch (type) {
                      case 'contacts':
                        return this.transformContacts(resp.results);
                      default:
                        return [];
                    }
                  })
                );
  }
}
