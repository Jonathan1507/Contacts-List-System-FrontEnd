import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules.
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { UsersComponent } from './maintenance/users/users.component';
import { ContactsComponent } from './maintenance/contacts/contacts.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    UsersComponent,
    ContactsComponent,
    PagesComponent
  ],
  exports: [
    UsersComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
