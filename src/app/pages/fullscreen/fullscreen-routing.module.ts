import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './cocina/cocina.component';


const routes: Routes = [
    {
        path: 'cocina',
        component: CocinaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FullscreenRoutingModule { }
