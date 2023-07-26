import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserAdminService } from '../admin-services/user-admin.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  quanitytTables = 0;
  tables;
  selectState: number = 0;
  idTable: number;
  categories;
  loading: boolean = true;

  formTable = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    capacity: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
  })

  constructor(private _userAdmService: UserAdminService) { }

  ngOnInit(): void {
    this.onChargeList();
  }

  async onChargeList() {
    this.loading = true;
    await this._userAdmService.getTables().then(resp => {
      console.log(resp);
      this.tables = resp;
    })
    this.quanitytTables = this.tables.length;

    await this._userAdmService.getTablesStates().then(resp => {
      this.categories = resp;
    })
    this.loading = false;
  }

  async onCreateTable() {
    if (this.formTable.value.name != "") {
      this.formTable.value.state = this.selectState;
      this._userAdmService.createTable(this.formTable.value).then(resp => {
        console.log(resp);
        this.onChargeList();
        return Swal.fire({
          icon: 'success',
          title: 'Mesa creada correctamente',
          text: ` Mesa creada`
        });
      }).catch(err => {
        return Swal.fire({
          icon: 'error',
          title: 'No pudo ser eliminada la mesa',
          text: ` Intente nuevamente`
        });
      })
    }

  }

  async onUpdateTable() {
    this.formTable.value.id = this.idTable;
    this.formTable.value.state = this.selectState;
    console.log(this.formTable.value);
    this._userAdmService.updateTable(this.formTable.value).then(resp => {

      this.onChargeList();
      return Swal.fire({
        icon: 'success',
        title: 'Mesa actualizada correctamente',
        text: ` Mesa actualizada`
      });
    }).catch(err => {

    })
  }

  async onDeleteTable() {
    this.loading = false;
    this._userAdmService.deleteTable(this.idTable).then(resp => {
      this.onChargeList();
      this.loading = true;
      return Swal.fire({
        icon: 'success',
        title: 'Se ah borrado la mesa seleccionada',
        text: ` ${resp["value"].message}`
      });
    }).catch(err => {
      this.loading = true;
      return Swal.fire({
        icon: 'error',
        title: 'No pudo ser eliminada la mesa',
        text: ` Intente nuevamente`
      });
    })
  }

  async selectedTableID(value) {
    console.log(value);
    this.idTable = value.id;
    if (value.mesaeId === undefined) {
      value.mesaeId = 0;
    }
    this.formTable = new FormGroup({
      id: new FormControl(value.id, [Validators.required]),
      name: new FormControl(value.name, [Validators.required]),
      capacity: new FormControl(value.capacity, [Validators.required]),
      state: new FormControl(value.mesaeId, [Validators.required]),
    })
  }

  async selectStateTable(id) {
    this.selectState = id;
  }

  onFindByState(id){
    this.loading = true;
    this._userAdmService.getTablesByStates(id).then(resp=>{
      this.tables = resp;
      this.loading = false;
    })
  }

  async onCleanForm() {
    this.formTable = new FormGroup({
      id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      capacity: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
    })
  }

}
