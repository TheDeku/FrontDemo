import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isDisabled0=false;
  isDisabled1=true;
  isDisabled2=true;
  constructor() { }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    console.log(this.step);
    if (this.step===0) {
   
      this.isDisabled1=false;
    }else if(this.step===1){
      this.isDisabled2=false;
    }
    this.step++;
  }

  prevStep() {
    console.log(this.step);
    if (this.step===0) {
      this.isDisabled0=true;
    }else if(this.step===1){
      this.isDisabled1=true;
    }else if(this.step===2){
      this.isDisabled2=true;
    }
    this.step--;
  }
}
