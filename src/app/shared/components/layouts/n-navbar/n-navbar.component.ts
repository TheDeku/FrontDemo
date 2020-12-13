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

  role: string[];

  usuario: string;

  userimage = "../assets/icons/userprofile.svg";

  data: any =
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
            "image": "../assets/icons/paquetes.svg"
          },
          {
            "name": "Finanzas",
            "url": "/admin/finance",
            "image": "../assets/icons/bodega.svg"
          },
          {
            "name": "Cocina",
            "url": "/admin/cocina",
            "image": "../assets/icons/cocinando.svg"
          },
          {
            "name": "Productos",
            "url": "/admin/product",
            "image": "../assets/icons/finanzas.svg"
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
            "url": "/vendor/historical",
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
            "name": "Solicitud",
            "url": "/warehouse/requeriments",
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
            "name": "Pedidos",
            "url": "/kitchen/cocina",
            "image": "../assets/icons/usuarios.svg"
          },
          {
            "name": "Solicitudes",
            "url": "/kitchen/requeriments",
            "image": "../assets/icons/solicitudes.svg"
          },
          {
            "name": "Productos",
            "url": "/kitchen/product",
            "image": "../assets/icons/finanzas.svg"
          },
          {
            "name": "Pantalla Completa",
            "url": "/fullscreen/cocina",
            "image": "../assets/icons/cocinando.svg"
          },
          {
            "name": "Cerrar Sesión",
            "url": "/main/close",
            "image": "../assets/icons/flecha-correcta.svg"
          }

        ],
    };

  pages: any;

  pagesnumber: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.jwtHelper.decodeToken(localStorage.getItem('id')).roles===undefined) {
      console.log("No existo");
      this.router.navigateByUrl("/signin");
    }else{
      this.role = this.jwtHelper.decodeToken(localStorage.getItem('id')).roles;
      this.usuario = this.jwtHelper.decodeToken(localStorage.getItem('id')).username;
      this.pages = this.data[this.role[this.role.length - 1]]
      this.pagesnumber = this.pages.length;
      let googleData = this.jwtHelper.decodeToken(localStorage.getItem('id')).googleData;
      if (googleData!=undefined) {
        console.log(googleData);
        this.userimage = googleData.picture;
      }
    }


  }

}
