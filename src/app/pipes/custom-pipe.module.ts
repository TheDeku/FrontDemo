import { NgModule } from '@angular/core';
import { TypePaymentPipe } from './payment-form.pipe';
import { CustomDatePipe } from './custom-date.pipe';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    TypePaymentPipe,
    CustomDatePipe
  ],
  exports: [
    TypePaymentPipe,
    CustomDatePipe
  ]
})
export class ApplicationPipesModule {}