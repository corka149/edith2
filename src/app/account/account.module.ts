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



@NgModule({
  declarations: [LoginComponent, UserGroupComponent, UserGroupDialogComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    TranslationsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    UserGroupService
  ],
  entryComponents: [UserGroupDialogComponent]
})
export class AccountModule { }
