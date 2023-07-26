import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserEmpyPipe } from '../../pipes/user-admin.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RequerimentsComponent } from './requeriments/requeriments.component';

import { PipeTableState } from '../../pipes/tablestate.pipe';
import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { KitchenRoutingModule } from './kitchen-routing.module';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [RequerimentsComponent,ProductComponent],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    KitchenRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class KitchenModule { }
