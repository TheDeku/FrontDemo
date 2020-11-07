import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModalComponent } from './users/user-modal/user-modal.component';
import { UsersComponent } from './users/users.component';
import { UserEmpyPipe } from '../../pipes/user-admin.pipe';


@NgModule({
  declarations: [UserModalComponent,UsersComponent,UserEmpyPipe],
  exports:[UserModalComponent,UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
