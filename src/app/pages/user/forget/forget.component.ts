import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  hide = true;
  user: User;
  public email = true;
  public token = false;
  public update = false
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private router: Router, private loginService: UserService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      switch (params.get('id')) {
        case 'email':
          this.email= true;
          this.token = false;
          this.update = false;
          break;
        case 'token':
          this.email= false;
          this.token = true;
          this.update = false;
          if (!localStorage.getItem('email')) {
            this.router.navigate(['/forget','email']);
          }
          break;
        case 'update':
          this.email= false;
          this.token = false;
          this.update = true;
          console.log(!localStorage.getItem('email'));
          console.log(!localStorage.getItem('pin'));
          if ((!localStorage.getItem('email') && !localStorage.getItem('pin'))) {
            this.router.navigate(['/forget','email']);
          }
          break;

        default:
          this.email= true;
          this.token = false;
          this.update = false;
          break;
      }

    });
  }

 public doSomething(){
   console.log("algo");
   this.email = false;
 }

}
