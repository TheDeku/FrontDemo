import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private jwtHelper = new JwtHelperService();

  role:string[] =this.jwtHelper.decodeToken(localStorage.getItem('id')).roles;
  constructor(private router: Router) { 
    console.log(this.role);
    if (this.role.includes("COCINA")) {
      this.router.navigateByUrl("/fullscreen/cocina");
    }
  }

  // test:boolean=true;
  // test2:boolean=false;
  // output(obj){
  //   console.log(obj);
  // } 

  ngOnInit(): void {
  }

}
