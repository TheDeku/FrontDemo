import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import md5 from 'md5-hash'
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/services/user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  hide = true;
  user: User;
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router, private loginService: UserService) { }

  ngOnInit(): void {

  }


  logIn() {


    console.log(this.formLogin.value['user']);

    console.log(md5(this.formLogin.value['password']));

    this.formLogin.value['password'] = md5(this.formLogin.value['password']);

    this.loginService.signIn(this.formLogin.value).toPromise().then(resp => {
      console.log(resp);
      localStorage.setItem('id', resp['token']);
      if (resp['status']) {
        this.router.navigate(['/dashboard']);
      }
      console.log(this.jwtHelper.decodeToken(localStorage.getItem('id')));
    });



    // this.router.navigate(['/dashboard']);
  }

}


