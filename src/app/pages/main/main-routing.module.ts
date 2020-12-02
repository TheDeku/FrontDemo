import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CloseComponent } from './close/close.component';
import { PrivacyComponent } from '../others/privacy/privacy.component';
import { BlankLayoutComponent } from '../../shared/components/layouts/blank-layout/blank-layout.component';



const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'close',
        component: CloseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
