import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNavbarComponent } from './n-navbar/n-navbar.component';


const components = [
    NNavbarComponent
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: components,
  exports: components
})
export class SharedComponentsModule { }
