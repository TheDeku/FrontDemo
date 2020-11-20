import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CloseComponent } from './close/close.component';



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
