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
import { WarehouseRoutingModule } from './warehouse-routing.module';

@NgModule({
  declarations: [RequerimentsComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    WarehouseRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarehouseModule { }
