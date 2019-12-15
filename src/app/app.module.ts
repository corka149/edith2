import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { AccountModule } from './account/account.module';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AccountModule,
    ShoppingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
