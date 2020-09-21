import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-n-navbar',
  templateUrl: './n-navbar.component.html',
  styleUrls: ['./n-navbar.component.css']
})
export class NNavbarComponent implements OnInit {

  userimage="../assets/icons/userprofile.svg";

  pages:any[]=[
  {
    name:"Usuarios",
    url:"/home",
    image:"../assets/icons/usuarios.svg"
  },
  {
    name:"Solicitudes",
    url:"/signin",
    image:"../assets/icons/solicitudes.svg"
  },
  {
    name:"Mesas",
    url:"#",
    image:"../assets/icons/mesas.svg"
  },
  {
    name:"Bodega",
    url:"#",
    image:"../assets/icons/bodega.svg"
  },
  {
    name:"Finanzas",
    url:"#",
    image:"../assets/icons/finanzas.svg"
  },
];

  pagesnumber:number= this.pages.length;

  constructor() { }

  ngOnInit(): void {
  }

}
