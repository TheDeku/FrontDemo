import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-update',
  templateUrl: './update.component.html',
  styleUrls: ['./../forget.component.css']
})
export class UpdateComponent implements OnInit {

  hide = true;
  user: User;
  formLogin = new FormGroup({
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private router: Router, private loginService: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  restorePassword(){
    if (this.formLogin.value['pass']!= this.formLogin.value['repass']) {
      return Swal.fire(
        'No se pudo actualizar la contraseña',
        'Las contraseñas no coinciden',
        'error'
      )
    }
    let data = {
      pass: this.formLogin.value['pass'],
      email: localStorage.getItem('email')
  }
  console.log(data);
    this.loginService.restore(data).toPromise().then(resp =>{
      let type;
      if (resp['status']) {
        this.router.navigate(['signin']);
        type = 'success'
        localStorage.removeItem('email')
        localStorage.removeItem('pin')
      }else{
        type = 'error'
      }
      Swal.fire(
        'Informacion',
        resp['message'],
        type
      )


    }).catch(err =>{
      Swal.fire(
        'Informacion',
        err['message'],
        'success'
      )
    });
  }
}
