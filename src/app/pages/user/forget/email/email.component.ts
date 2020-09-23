import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ForgetComponent } from '../forget.component';

@Component({
  selector: 'app-forget-email',
  templateUrl: './email.component.html',
  styleUrls: ['./../forget.component.css']
})
export class EmailComponent implements OnInit {

  hide = true;
  user: User;
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  constructor(private router: Router, private loginService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  restoreEmail() {
    localStorage.setItem('email', this.formLogin.value['email']);
    console.log(localStorage.getItem('email'));
    this.loginService.forget(this.formLogin.value).toPromise().then(resp => {
      let type;
      if (resp['status']) {
        this.router.navigate(['/forget','token']);
        type = 'success'
      }else{
        type = 'error'
      }
      Swal.fire(
        'Informacion',
        resp['message'],
        type
      )

    }).catch(err => {
      Swal.fire(
        'Informacion',
        err['message'],
        'success'
      )
    });
  }
}
