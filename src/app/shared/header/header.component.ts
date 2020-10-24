import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  user: User;

  constructor(private usersService: UsersService) {
    this.user = usersService.user;
  }

  signOff(){
    this.usersService.signOff();
  }

}
