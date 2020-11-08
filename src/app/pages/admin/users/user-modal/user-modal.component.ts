import { ViewFlags } from '@angular/compiler/src/core';
import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input()
  user;
  formEditUser = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    apellido:new FormControl("", [Validators.required]),
    imagen:new FormControl("", [Validators.required]),
    telefono:new FormControl("", [Validators.required]),
    direcciN:new FormControl("", [Validators.required]),
    ciudad:new FormControl("", [Validators.required]),
    comuna:new FormControl("", [Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
    console.log(this.user);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.user);
    
  }

  openModal(value:any){

  }

  update(data){

  }

  view(data){

  }

  delete(data){

  }

  getInfo(data){

  }

}
