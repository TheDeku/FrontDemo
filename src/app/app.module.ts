import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/user.service';
import { SharedModule } from './shared/shared.module';

import {DataTablesModule} from 'angular-datatables';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { OrderToCardPipe } from './pipes/order-to-card.pipe';



@NgModule({
  declarations: [
    AppComponent,
    DomseguroPipe,
    OrderToCardPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule
  ],
  providers: [UserService,OrderToCardPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
