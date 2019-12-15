import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { LoginComponent } from './account/login/login.component';
import { UserGroupComponent } from './account/user-group/user-group.component';
import { UserGroupMembershipComponent } from './account/user-group-membership/user-group-membership.component';
import { ShoppingListOverviewComponent } from './shopping/shopping-list-overview/shopping-list-overview.component';
import { ItemsComponent } from './shopping/items/items.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shoppinglists/current', component: ShoppingListOverviewComponent},
  { path: 'shoppinglists/all', component: ShoppingListOverviewComponent},
  { path: 'shoppinglists/:id/items', component: ItemsComponent},
  { path: 'usergroups/management', component: UserGroupComponent},
  { path: 'usergroups/membership', component: UserGroupMembershipComponent},
  { path: 'signin', component: LoginComponent},
  { path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
