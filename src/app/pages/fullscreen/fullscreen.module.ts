import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenRoutingModule } from "./fullscreen-routing.module";
import { RouterModule } from '@angular/router';
import { CocinaComponent } from './cocina/cocina.component';


@NgModule({
  declarations: [CocinaComponent],
  imports: [
    CommonModule,
    FullscreenRoutingModule,
    RouterModule
  ]
})
export class FullscreenModule { }
