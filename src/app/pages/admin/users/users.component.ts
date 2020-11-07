import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../admin-services/user-admin.service';
import { UserEmpyPipe } from "../../../pipes/user-admin.pipe";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(private _userAdmService:UserAdminService) { }

  async ngOnInit(): Promise<void> {
    await this._userAdmService.getall().then(resp=>{
      this.users = resp;
    })

    console.log(this.users);
  }

}
