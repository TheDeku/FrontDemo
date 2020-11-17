import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../admin-services/user-admin.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  quanitytTables=0;
  tables;
  constructor(private _userAdmService: UserAdminService) { }

  ngOnInit(): void {
    this.onChargeList();
  }

  async onChargeList(){
    await this._userAdmService.getTables().then(resp=>{
      this.tables = resp;
    })
    this.quanitytTables = this.tables.length;
  }

}
