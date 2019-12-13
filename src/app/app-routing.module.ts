import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { LoginComponent } from './account/login/login.component';
import { UserGroupComponent } from './account/user-group/user-group.component';
import { UserGroupMembershipComponent } from './account/user-group-membership/user-group-membership.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shoppinglists/current', component: WelcomeComponent},
  { path: 'shoppinglists/all', component: WelcomeComponent},
  { path: 'usergroups/management', component: UserGroupComponent},
  { path: 'usergroups/membership', component: UserGroupMembershipComponent},
  { path: 'signin', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
