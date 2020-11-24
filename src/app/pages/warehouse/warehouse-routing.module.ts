import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequerimentsComponent } from './requeriments/requeriments.component';

const routes: Routes = [
    {
        path: 'requeriments',
        component: RequerimentsComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseRoutingModule { }
