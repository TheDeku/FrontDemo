import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { UserAdminService } from '../admin-services/user-admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  roles;
  workerQuantity: number = 0;
  tempUserId: number = 0;
  roleFilter: string;
  loading: boolean = true;
  hide = true;
  hiderepass = true;

  viewImageInfoUser: {
    urlImage: "",
    name: string,
    description: ""
  }
  @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
  @ViewChild(MatFormField) _matFormField: MatFormField;
  formUser = new FormGroup({
    quantity: new FormControl(5, [Validators.required]),
  })
  formEditUser = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    imagen: new FormControl("", [Validators.required]),
    telefono: new FormControl("", [Validators.required]),
    direcciN: new FormControl("", [Validators.required]),
    ciudad: new FormControl("", [Validators.required]),
    comuna: new FormControl("", [Validators.required]),
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(7)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(7)]),
  })

  selectedRole;
  constructor(private _userAdmService: UserAdminService) {
  }

  async ngOnInit(): Promise<void> {
    await this._userAdmService.getRoles().then(resp => {
      this.roles = resp;

    })



  }

  async searchWorkers(filter: any) {
    this.roleFilter = filter;
    filter = { role: filter, size: parseInt(this.formUser.value.quantity) };
    await this._userAdmService.getUsers(filter).then(resp => {
      this.users = resp;
      this.workerQuantity = this.users.length;
    })
  }

  onEdit(user: any) {
    console.log(user);
    this.formEditUser.value.nombre = user.username
    this.tempUserId = user.id
    this.viewImageInfoUser.name = `${user.usuDet.nombre} ${user.usuDet.apellido}`
    this.viewImageInfoUser.description = user.email;
    this.viewImageInfoUser.urlImage = user.usuDet.imagen;
    console.log(this.viewImageInfoUser);
    console.log(this.formEditUser);
    this.formEditUser = new FormGroup({
      nombre: new FormControl(user.usuDet.nombre, [Validators.required]),
      apellido: new FormControl(user.usuDet.apellido, [Validators.required]),
      telefono: new FormControl(user.usuDet.telefono, [Validators.required]),
      direcciN: new FormControl(user.usuDet.direcciN, [Validators.required]),
      ciudad: new FormControl(user.usuDet.ciudad, [Validators.required]),
      comuna: new FormControl(user.usuDet.comuna, [Validators.required]),
    })
  }

  async onModify() {
    let value = this.formEditUser.value;
    value.usuarioId = this.tempUserId
    await this._userAdmService.modifyUserDetail(this.formEditUser.value).then(resp => {
      console.log(resp);
      this.searchWorkers(this.roleFilter);
      return Swal.fire({
        icon: 'success',
        title: resp['message'],
        text: `Se actualizo correctamente la información de ${value.nombre}`
      }
      )
    }).catch(err => {

    })

  }

  onSelectedRole(role: string) {
    this.selectedRole = role;
  }

  async onCreateWorker() {
    console.log(this.selectedRole);
    if (this.selectedRole === undefined) {
      return Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un rol',
        text: `Seleccione un rol`
      })
    } else {
      this.formEditUser.value.rol = this.selectedRole;
      console.log(this.formEditUser.value);
      await this._userAdmService.createWorker(this.formEditUser.value);
    }

  }

}
