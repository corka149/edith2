import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslationsModule } from '../translations/translations.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AccountModule } from '../account/account.module';



@NgModule({
  declarations: [MainComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    TranslationsModule,
    MaterialDesignModule,
    AccountModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
