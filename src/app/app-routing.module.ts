import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { LoginComponent } from './account/login/login.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shoppinglists/current', component: WelcomeComponent},
  { path: 'shoppinglists/all', component: WelcomeComponent},
  { path: 'usergroups', component: WelcomeComponent},
  { path: 'signin', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
