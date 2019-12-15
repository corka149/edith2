import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListOverviewComponent, ShoppingListDialogComponent } from './shopping-list-overview/shopping-list-overview.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { TranslationsModule } from '../translations/translations.module';
import { ShoppingListService } from './services/shopping-list.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShoppingListOverviewComponent,
    ShoppingListDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    TranslationsModule
  ],
  exports: [
    ShoppingListOverviewComponent
  ],
  providers: [
    ShoppingListService
  ],
  entryComponents: [
    ShoppingListDialogComponent
  ]
})
export class ShoppingModule { }
