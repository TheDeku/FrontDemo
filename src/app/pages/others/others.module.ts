import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OthersRoutingModule
  ],
  declarations: [NotFoundComponent,PrivacyComponent]
})
export class OthersModule { }
