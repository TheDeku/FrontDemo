import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NNavbarComponent } from './n-navbar/n-navbar.component';
import { RouterModule } from '@angular/router';


const components = [
    NNavbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: components,
  exports: components
})
export class SharedComponentsModule { }
