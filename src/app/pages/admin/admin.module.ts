import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { UserEmpyPipe } from '../../pipes/user-admin.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RequerimentsComponent } from './requeriments/requeriments.component';
import { TablesComponent } from './tables/tables.component';
import { FinanceComponent } from './finance/finance.component';
import { PipeTableState } from '../../pipes/tablestate.pipe';

@NgModule({
  declarations: [UsersComponent,UserEmpyPipe,PipeTableState, WarehouseComponent, RequerimentsComponent, TablesComponent, FinanceComponent],
  exports:[UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
