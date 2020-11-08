import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from './components/shared-components.module';
import { BlankLayoutComponent } from './components/layouts/blank-layout/blank-layout.component';
import { FullscreenLayoutComponent } from './components/layouts/fullscreen-layout/fullscreen-layout.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule
  ],
  declarations: [LoadingComponent],
  exports:[LoadingComponent]
})
export class SharedModule { }