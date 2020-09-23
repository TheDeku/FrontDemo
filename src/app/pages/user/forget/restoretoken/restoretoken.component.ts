import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-restore-token',
  templateUrl: './restoretoken.component.html',
  styleUrls: ['./../forget.component.css']
})
export class RestoreTokenComponent implements OnInit {

  hide = true;
  user: User;
  formLogin = new FormGroup({
    code: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
  })
  constructor(private router: Router, private loginService: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  restoreToken(){

    let data = {restore: this.formLogin.value['code'], email: localStorage.getItem['email']}
    

    this.loginService.validate(this.formLogin.value).toPromise().then(resp =>{


      let type;
      if (resp['status']) {
        this.router.navigate(['/forget','update']);
        type = 'success'
        localStorage.setItem('pin',data.restore);
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
        'warning'
      )
    });
  }
}
