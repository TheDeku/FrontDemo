import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModalComponent } from './users/user-modal/user-modal.component';
import { UsersComponent } from './users/users.component';
import { UserEmpyPipe } from '../../pipes/user-admin.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../shared/components/loading/loading.component';


@NgModule({
  declarations: [UserModalComponent,UsersComponent,UserEmpyPipe],
  exports:[UserModalComponent,UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
