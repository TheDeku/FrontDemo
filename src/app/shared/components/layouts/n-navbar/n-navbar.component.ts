import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-n-navbar',
  templateUrl: './n-navbar.component.html',
  styleUrls: ['./n-navbar.component.css']
})
export class NNavbarComponent implements OnInit {

  private jwtHelper = new JwtHelperService();

  role:string[] =this.jwtHelper.decodeToken(localStorage.getItem('id')).roles;

  usuario:string = this.jwtHelper.decodeToken(localStorage.getItem('id')).username;

  userimage="../assets/icons/userprofile.svg";

  data:any=
  {
    "ADMIN":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Users",
          "url": "/admin/user",
          "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Requeriments",
          "url": "/admin/requeriments",
          "image": "../assets/icons/solicitudes.svg"
      },
      {
          "name": "Tables",
          "url": "/admin/tables",
          "image": "../assets/icons/mesas.svg"
      },
      {
          "name": "Warehouse",
          "url": "/admin/warehouse",
          "image": "../assets/icons/bodega.svg"
      },
      {
          "name": "Finance",
          "url": "/admin/finance",
          "image": "../assets/icons/finanzas.svg"
      }
    ],
    "GARZON":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "en preparación",
          "url": "main/home",
          "image": "../assets/icons/cocinando.svg"
      },
      {
          "name": "Listos",
          "url": "/signin",
          "image": "../assets/icons/wok.svg"
      },
      {
          "name": "Mesas",
          "url": "/asdafds",
          "image": "../assets/icons/mesas.svg"
      }
    ],
    "COCINA":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Cola",
          "url": "main/home",
          "image": "../assets/icons/flecha-correcta.svg"
      },
      {
          "name": "Marcar listo",
          "url": "/signin",
          "image": "../assets/icons/listo.svg"
      },
      {
          "name": "solicitar",
          "url": "/asdafds",
          "image": "../assets/icons/pregunta.svg"
      },
      
    ],
    "BODEGA":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Agregar stock",
          "url": "main/home",
          "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Consulta stock",
          "url": "/signin",
          "image": "../assets/icons/paquetes.svg"
      },
      {
          "name": "Solicitud",
          "url": "/asdafds",
          "image": "../assets/icons/carro.svg"
      },
    ],
    "CLIENTE":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Carta",
          "url": "main/home",
          "image": "../assets/icons/menu.svg"
      },
      {
          "name": "Cuenta",
          "url": "main/home",
          "image": "../assets/icons/cuenta.svg"
      },
    ],
  };

  pages:any = this.data[this.role[this.role.length-1]]

  pagesnumber:number= this.pages.length;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
