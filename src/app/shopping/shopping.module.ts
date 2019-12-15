import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListOverviewComponent, ShoppingListDialogComponent } from './shopping-list-overview/shopping-list-overview.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { TranslationsModule } from '../translations/translations.module';
import { ShoppingListService } from './services/shopping-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ShoppingListOverviewComponent,
    ShoppingListDialogComponent,
    ItemsComponent
  ],
  imports: [
    AppRoutingModule,
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
