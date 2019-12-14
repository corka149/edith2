import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationsModule } from '../translations/translations.module';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { UserGroupService } from './services/user-group.service';
import { UserGroupComponent, UserGroupDialogComponent } from './user-group/user-group.component';
import { UserGroupMembershipComponent, UserGroupMembershipDialogComponent } from './user-group-membership/user-group-membership.component';
import { InvitationService } from './services/invitation.service';



@NgModule({
  declarations: [
    LoginComponent,
    UserGroupComponent,
    UserGroupDialogComponent,
    UserGroupMembershipComponent,
    UserGroupMembershipDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    TranslationsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    UserGroupService,
    InvitationService
  ],
  entryComponents: [
    UserGroupDialogComponent,
    UserGroupDialogComponent,
    UserGroupMembershipDialogComponent
  ]
})
export class AccountModule { }
