import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenRoutingModule } from "./fullscreen-routing.module";
import { RouterModule } from '@angular/router';
import { CocinaComponent } from './cocina/cocina.component';
import { OrdercardComponent } from '../../shared/components/ordercard/ordercard.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [CocinaComponent,OrdercardComponent], 
  imports: [
    CommonModule,
    FullscreenRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class FullscreenModule { }
