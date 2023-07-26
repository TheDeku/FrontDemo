import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NsummarybarService, NsummaryData } from '../../componentComunication/nsummarybar.service';

@Component({
  selector: 'app-nsummarybar',
  templateUrl: './nsummarybar.component.html',
  styleUrls: ['./nsummarybar.component.css']
})
export class NsummarybarComponent  implements OnDestroy {

  clock:string;

  nlog:NsummaryData[]=[];
  subscription: Subscription;
  
  constructor(private selfService:NsummarybarService) { 
    this.subscription = selfService.datalog.subscribe((e:NsummaryData)=>{
      console.log(e);
      e.stamp=this.clock;
      this.nlog.push(e);
    })
  }

  interval=setInterval(()=>{
    var date = new Date();
   
    let hou = ("0"+date.getHours().toString()).slice(-2);
    let min = ("0"+date.getMinutes().toString()).slice(-2);
    let seg = ("0"+date.getSeconds().toString()).slice(-2);

    this.clock=`${hou}:${min}:${seg}`;
    
  },500) 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
