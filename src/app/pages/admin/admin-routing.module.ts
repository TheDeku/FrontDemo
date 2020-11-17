import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RequerimentsComponent } from './requeriments/requeriments.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
    {
        path: 'user',
        component: UsersComponent
    },
    {
        path: 'warehouse',
        component: WarehouseComponent
    },
    {
        path: 'requeriments',
        component: RequerimentsComponent
    }, 
    {
        path: 'tables',
        component: TablesComponent
    }
    , 
    {
        path: 'finance',
        component: TablesComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
