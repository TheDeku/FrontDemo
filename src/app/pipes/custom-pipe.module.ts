import { NgModule } from '@angular/core';
import { TypePaymentPipe } from './payment-form.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { EmpyImagePipe } from './empyImage.pipe';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    TypePaymentPipe,
    CustomDatePipe,
    EmpyImagePipe
  ],
  exports: [
    TypePaymentPipe,
    CustomDatePipe,
    EmpyImagePipe
  ]
})
export class ApplicationPipesModule {}