import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './main/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shoppinglists/current', component: WelcomeComponent},
  { path: 'shoppinglists/all', component: WelcomeComponent},
  { path: 'usergroups', component: WelcomeComponent},
  { path: 'signin', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
