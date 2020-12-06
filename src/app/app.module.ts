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
import { MessagingService } from './shared/services/messaging.service';
import { AngularFireMessaging, AngularFireMessagingModule } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TypePaymentPipe } from './pipes/payment-form.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AdminModule } from './pages/admin/admin.module';
import { ApplicationPipesModule } from './pipes/custom-pipe.module';



@NgModule({
  declarations: [
    AppComponent,
    OrderToCardPipe,    
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
    ApplicationPipesModule,
    ServiceWorkerModule.register('firebase-messaging-sw.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UserService,OrderToCardPipe,QRCode,MessagingService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { } 
