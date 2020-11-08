import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { UserAdminService } from '../admin-services/user-admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  roles;
  workerQuantity:number=0;
  @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
  @ViewChild(MatFormField) _matFormField: MatFormField;
  formUser = new FormGroup({
    quantity: new FormControl(5, [Validators.required]),
  })

  constructor(private _userAdmService:UserAdminService) { 
  }

  async ngOnInit(): Promise<void> {

    await this._userAdmService.getRoles().then(resp=>{
      this.roles = resp;
    })


    console.log(this.roles);
  }

  async searchWorkers(filter:any){
    console.log(this.formUser.value);
    filter={role:filter,size:parseInt(this.formUser.value.quantity)};
    console.log(filter);
    await this._userAdmService.getUsers(filter).then(resp=>{
      this.users = resp;
      this.workerQuantity = this.users.length;
    })

    console.log(this.users);
  }

}
