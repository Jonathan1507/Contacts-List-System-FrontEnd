import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// Interfaces
import { LoadUser } from '../interfaces/load-users.interface';
import { FormLogin } from '../interfaces/login-form-interface';
import { FormRegister } from '../interfaces/register-form.interface';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.user.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  // SIGN OFF.
  signOff(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {surnames, email, uid} = resp.user;

        this.user = new User(name, surnames, email, '', uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
        catchError(err => of(false))
    );
  }

  createUser(formData: FormRegister){
    return this.http.post(`${base_url}/users`, formData)
                        .pipe(
                          tap((resp: any) => {
                            localStorage.setItem('token', resp.token);
                          })
                        );
  }

  updateUser(data: {name: string, surnames: string, email: string}){
    data = {
      ...data
    };

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  logueo(formData: FormLogin){
    return this.http.post(`${base_url}/login`, formData)
                        .pipe(
                          tap((resp: any) => {
                            localStorage.setItem('token', resp.token);
                          })
                        );
  }

  deleteUser(user: User){
    const url = `${base_url}/usuarios/${user.uid}`;
    return this.http.delete(url, this.headers);
  }
}
