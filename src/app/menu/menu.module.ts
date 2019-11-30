import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialDesignModule } from '../material-design/material-design.module';



@NgModule({
  declarations: [ToolbarComponent, SidenavComponent],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent
  ]
})
export class MenuModule { }
