import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layouts/layout.module';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import { MatCardModule } from '@angular/material/card';


const components = [

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,   

  ],
  declarations: components,
  exports: components
})
export class SharedComponentsModule { }
