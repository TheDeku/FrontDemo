import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/user.service';
import { SharedModule } from './shared/shared.module';

import {DataTablesModule} from 'angular-datatables';
import { OrderToCardPipe } from './pipes/order-to-card.pipe';
import { UserEmpyPipe } from './pipes/user-admin.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PipeTableState } from './pipes/tablestate.pipe';
import { QRCode } from 'qrcode-generator-ts';
import { DomseguroPipe } from './pipes/domseguro.pipe';



@NgModule({
  declarations: [
    AppComponent,
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
    RouterModule,
    NgbModule,
  ],
  providers: [UserService,OrderToCardPipe,QRCode],
  bootstrap: [AppComponent]
})
export class AppModule { } 
