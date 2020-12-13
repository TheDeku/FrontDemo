import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layouts/layout.module';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from './loading/loading.component';
import { MatButtonModule } from '@angular/material/button';


const components = [

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,  
    MatButtonModule, 

  ],
  declarations: components,
  exports: components
})
export class SharedComponentsModule { }
