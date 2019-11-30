import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialDesignModule,
  ],
  exports: [
    MainMenuComponent
  ]
})
export class MenuModule { }
