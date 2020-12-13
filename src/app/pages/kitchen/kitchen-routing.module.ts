import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequerimentsComponent } from './requeriments/requeriments.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'requeriments',
        component: RequerimentsComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class KitchenRoutingModule { }
