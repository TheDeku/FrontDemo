import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
})
export class CloseComponent implements OnInit {

  constructor(private router: Router) { 

    Swal.fire({
      title: 'Seguro que desea cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: `Salir`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl("/signin");
      }else{
        this.router.navigateByUrl("/main/home");
      }
    })

    

  }

  ngOnInit(): void {
  }

}
