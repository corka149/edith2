import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListOverviewComponent } from './shopping-list-overview/shopping-list-overview.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { TranslationsModule } from '../translations/translations.module';
import { ShoppingListService } from './services/shopping-list.service';



@NgModule({
  declarations: [ShoppingListOverviewComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    TranslationsModule
  ],
  exports: [
    ShoppingListOverviewComponent
  ],
  providers: [
    ShoppingListService
  ]
})
export class ShoppingModule { }
