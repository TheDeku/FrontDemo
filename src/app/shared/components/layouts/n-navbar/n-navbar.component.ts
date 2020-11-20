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
          "name": "Usuarios",
          "url": "/admin/user",
          "image": "../assets/icons/usuarios.svg"
      },
      {
          "name": "Solicitudes",
          "url": "/admin/requeriments",
          "image": "../assets/icons/solicitudes.svg"
      },
      {
          "name": "Mesas",
          "url": "/admin/tables",
          "image": "../assets/icons/mesas.svg"
      },
      {
          "name": "Bodega",
          "url": "/admin/warehouse",
          "image": "../assets/icons/bodega.svg"
      },
      {
          "name": "Finanzas",
          "url": "/admin/finance",
          "image": "../assets/icons/finanzas.svg"
      },
      {
        "name": "Cocina",
        "url": "/admin/cocina",
        "image": "../assets/icons/cocinando.svg"
    },
      {
        "name": "Cerrar Sesión",
        "url": "/main/close",
        "image": "../assets/icons/flecha-correcta.svg"
    }
    ],
    "CAJERO":
    [ 
      {
        "name": "Caja",
        "url": "/vendor/payment",
        "image": "../assets/icons/cuenta.svg"
      },
      {
          "name": "Historial",
          "url": "main/home",
          "image": "../assets/icons/pregunta.svg"
      },
      {
        "name": "Cerrar Sesión",
        "url": "/main/close",
        "image": "../assets/icons/flecha-correcta.svg"
    }
      
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
          "url": "/main/home",
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
      {
        "name": "Cerrar Sesión",
        "url": "/main/close",
        "image": "../assets/icons/flecha-correcta.svg"
    }
    ],
    "COCINA":
    [ 
      {
        "name": "Home",
        "url": "/main/home",
        "image": "../assets/icons/usuarios.svg"
      }
    ],
  };

  pages:any = this.data[this.role[this.role.length-1]]

  pagesnumber:number= this.pages.length;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
