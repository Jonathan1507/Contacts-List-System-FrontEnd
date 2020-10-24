import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router){}

  canActivate(
    ext: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usersService.validateToken()
              .pipe(
                tap(isAuthenticated => {
                  if (!isAuthenticated) {
                    this.router.navigateByUrl('/login');
                  }
                })
              );
  }
  
}
