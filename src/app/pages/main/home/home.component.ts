import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private jwtHelper = new JwtHelperService();

  role: string[];

  constructor(private router: Router) {
    // if (this.role.includes("COCINA")) {
    //   this.router.navigateByUrl("/fullscreen/cocina");
    // }
    // Will alert once, after a second.
  
    try {
      if (this.jwtHelper.decodeToken(localStorage.getItem('id')).roles===undefined) {
        console.log("No existo");
        this.router.navigateByUrl("/signin");
      }else{
        this.role = this.jwtHelper.decodeToken(localStorage.getItem('id')).roles;
        console.log(this.role);
      }

    } catch (error) {
      this.router.navigateByUrl("/signin");
    }

    let timer = 300000;
    setInterval(function () {
      routerLink: Router;
      let jwt = localStorage.getItem('id');
      if (jwt == null || typeof jwt == undefined) {
        console.log("algo");
        console.log(localStorage.getItem('id'));
      }

      let now = new Date();
      let valid = false;
      let decoded = JSON.parse(atob(jwt.split(".")[1]));
      if (decoded == null) {
   
      }else if (decoded["exp"] *1000 > now.getTime()) {
        valid = true;
        //console.log(valid);
      }else{
        //console.log(valid);
        return Swal.fire({
          icon: 'warning',
          title: `Sesion expirada`,
          text: `Ah expirado la sesion`,
          showConfirmButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            localStorage.removeItem("id");
            router.navigateByUrl("/signin");
          }
        })
      }


    }, timer);
   
  }

  // test:boolean=true;
  // test2:boolean=false;
  // output(obj){
  //   console.log(obj);
  // } 

  ngOnInit(): void {

  }


  decodeJWT() {
    let jwt = localStorage.getItem('token');
    if (jwt == null || typeof jwt == undefined) {
      return null;
    }
    return JSON.parse(atob(jwt.split(".")[1]));
  }

  validJWT() {
    let now = new Date();
    let valid = false;
    let decoded = this.decodeJWT()
    if (decoded == null) {
      return valid;
    }
    if (this.decodeJWT()["exp"] * 1000 > now.getTime()) {
      valid = true;
    }
    return valid;
  }

}
