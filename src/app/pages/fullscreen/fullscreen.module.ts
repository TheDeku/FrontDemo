import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenRoutingModule } from "./fullscreen-routing.module";
import { RouterModule } from '@angular/router';
import { CocinaComponent } from './cocina/cocina.component';
import { OrdercardComponent } from '../../shared/components/ordercard/ordercard.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';


@NgModule({
  declarations: [CocinaComponent,OrdercardComponent,LoadingComponent],
  imports: [
    CommonModule,
    FullscreenRoutingModule,
    RouterModule
  ]
})
export class FullscreenModule { }
