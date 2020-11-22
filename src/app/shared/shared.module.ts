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
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [LoadingComponent,QrInputComponent,DomseguroPipe,QrOutputComponent,HorizonalColumnComponent,VerticalRowComponent],
  exports:[LoadingComponent,QrInputComponent,DomseguroPipe,QrOutputComponent,HorizonalColumnComponent,VerticalRowComponent]
})
export class SharedModule { }