import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AppRoutingModule } from '../app-routing.module';
import { TranslationsModule } from '../translations/translations.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialDesignModule,
    TranslationsModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }