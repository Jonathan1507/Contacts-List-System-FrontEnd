import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { ContactsComponent } from './maintenance/contacts/contacts.component';
import { UsersComponent } from './maintenance/users/users.component';


const routes: Routes = [

    // Only people who are authenticated will have access.
    // Implementation of child routes.
    {
    path: 'contacts',
    component: PagesComponent, canActivate: [AuthGuard],
    children: [
        // Default path.
        { path: '', component: ContactsComponent, data: {title: 'Contacts'}},

        // Maintenance
        { path: 'users', component: UsersComponent, data: {title: 'System users'}}
    ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
