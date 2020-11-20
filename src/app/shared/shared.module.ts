import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from './components/shared-components.module';
import { BlankLayoutComponent } from './components/layouts/blank-layout/blank-layout.component';
import { FullscreenLayoutComponent } from './components/layouts/fullscreen-layout/fullscreen-layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { QrInputComponent } from './components/io/qr-input/qr-input.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DomseguroPipe } from '../pipes/domseguro.pipe';
import { QrOutputComponent } from './components/io/qr-output/qr-output.component';
import { HorizonalColumnComponent } from './components/horizonal-column/horizonal-column.component';
import { MatCardModule } from '@angular/material/card';
import { VerticalRowComponent } from './components/vertical-row/vertical-row.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule,
    MatCardModule
  ],
  declarations: [LoadingComponent,QrInputComponent,DomseguroPipe,QrOutputComponent,HorizonalColumnComponent,VerticalRowComponent],
  exports:[LoadingComponent,QrInputComponent,DomseguroPipe,QrOutputComponent,HorizonalColumnComponent,VerticalRowComponent]
})
export class SharedModule { }