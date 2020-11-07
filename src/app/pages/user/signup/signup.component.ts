import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  user: User;
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(7)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(7)])
  })


  constructor(private router: Router, private loginService: UserService) {

  }

  ngOnInit(): void {

  }


  createAccount() {
    this.formLogin.disable();
    if (this.formLogin.value['pass']!= this.formLogin.value['repass']) {
      return Swal.fire(
        'No se pudo crear la cuenta',
        'Las contraseñas no coinciden',
        'error'
      )
    }



    this.loginService.signUp(this.formLogin.value).toPromise().then(resp => {
      console.log(resp);
      if (resp['state']) {
        this.router.navigate(['/signin']);
      }
    }).catch(err => {
      console.log(err);
      this.formLogin.enable();
      return Swal.fire(
        'No se pudo crear la cuenta',
        err.error.value.message,
        'error'
      )
    });




  }

}

