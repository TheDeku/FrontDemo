import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarLayoutComponent } from './navbar-layout/navbar-layout.component';
import { FullscreenLayoutComponent } from './fullscreen-layout/fullscreen-layout.component';
import { NNavbarComponent } from './n-navbar/n-navbar.component';
import { SharedModule } from '../../shared.module';
import { NsummarybarComponent } from './nsummarybar/nsummarybar.component';
import { FooterComponent } from './footer/footer.component';

const components = [
    BlankLayoutComponent,
    NavBarLayoutComponent,
    FullscreenLayoutComponent,
    NNavbarComponent,
    NsummarybarComponent,
    FooterComponent
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class LayoutModule { }
