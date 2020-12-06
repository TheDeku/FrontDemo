import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricalComponent } from './historical/historical.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'historical',
        component: HistoricalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VendorRoutingModule { }
