import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import md5 from 'md5-hash'
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/services/user.service';
import Swal from 'sweetalert2';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Urls } from 'src/app/shared/model/url.model';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  hide = true;
  user: User;
  activateMethod: boolean= false;
  urls = new Urls();
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  private jwtHelper = new JwtHelperService();
  loginWindow: any;
  constructor(private router: Router, private loginService: UserService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('./../../../../assets/icons/googleIcon.svg'));
   }

  ngOnInit(): void {
    
  }


  logIn() {

    this.formLogin.disable();

    // console.log(this.formLogin.value['user']);

    // console.log(md5(this.formLogin.value['password']));

    //this.formLogin.value['password'] = md5(this.formLogin.value['password']);

    if (!this.activateMethod) {
      this.activateMethod = true;
      this.loginService.signIn(this.formLogin.value).toPromise().then(resp => {
        console.log(resp);
        localStorage.setItem('id', resp['token']);
        if (resp['status']) {
          this.router.navigate(['/main/home']);
        }
        console.log(this.jwtHelper.decodeToken(localStorage.getItem('id')));
      }).catch(err =>{
        console.log(err);
        this.formLogin.enable();
        this.activateMethod = false;
        return Swal.fire(
          'No se pudo iniciar sesión',
          err['error']['message'],
          'error'
        )
      });
    }
    }

  logInGoogle(){
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    this.loginWindow = window.open(
      `${this.urls.urlsToLogin.toGoogle}`,
      "",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=" +
        width +
        " , height=" +
        height +
        " , " +
        " top=" +
        top +
        " , left=" +
        left +
        " "
    );

    window.addEventListener("message", (event) => {

      let obj = JSON.parse(event.data);

      localStorage.setItem('id', obj['token']);
      if (obj['status']) {
        this.loginWindow.close();
        window.removeEventListener("message", this.logInGoogle);
        let roles: string[] = this.jwtHelper.decodeToken(localStorage.getItem('id')).roles;
        console.log(roles[roles.length - 1])
        if (roles[roles.length - 1]!="CLIENTE") {
          this.router.navigate(['/main/home']);
        }else{
          localStorage.clear();
          return Swal.fire({
            icon: 'error',
            title: `Tipo de usurio no reconocido`,
            text: ` Intente nuevamente`
          });
        }

      }else{
        this.loginWindow.close();
        window.removeEventListener("message", this.logInGoogle);
        return Swal.fire({
          icon: 'error',
          title: `${obj['message']}`,
          text: ` Intente nuevamente`
        });
      }
     
    });
  }

  

}


