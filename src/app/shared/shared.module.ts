import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from './components/shared-components.module';
import { BlankLayoutComponent } from './components/layouts/blank-layout/blank-layout.component';
import { FullscreenLayoutComponent } from './components/layouts/fullscreen-layout/fullscreen-layout.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule
  ],
  declarations: [BlankLayoutComponent,FullscreenLayoutComponent]
})
export class SharedModule { }