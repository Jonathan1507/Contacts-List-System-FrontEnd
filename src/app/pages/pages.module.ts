import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules.
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

// Components
import { UsersComponent } from './maintenance/users/users.component';
import { ContactsComponent } from './maintenance/contacts/contacts.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './maintenance/contacts/register/register.component';
import { UpdateComponent } from './maintenance/contacts/update/update.component';

@NgModule({
  declarations: [
    UsersComponent,
    ContactsComponent,
    PagesComponent,
    ProfileComponent,
    RegisterComponent,
    UpdateComponent
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
