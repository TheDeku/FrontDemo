import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ɵConsole } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-ordercard',
  templateUrl: './ordercard.component.html',
  styleUrls: ['./ordercard.component.css']
})
export class OrdercardComponent implements OnChanges {
  @Input() items: any[];
  @Output() buttonClick: EventEmitter<any>= new EventEmitter<any>();
  
  sat:boolean=false;
  constructor() { 
    let date =new Date().getTime();
    if(date>1608681600000 && date<1608940800000){
      this.sat=true;
    }
  }

  ngOnChanges(changes) {
    this.initTimers();
  }

  Expand(item){
    if(item["expand"]==true){
      item.expand=false;
    }
    else{
      this.items.forEach(e=>e.expand=false);
      item.expand=true;
    }
  }

  onClick(item){
   this.buttonClick.emit({id:item.id,state:item.pedidoeId});
  }

  initTimers(){
    if(this.items!=undefined){
      this.items.forEach(e=>{
        if(e.time!=undefined){
          e.time.interval=setInterval(()=>{
            e.time.counter-=1;
            e.time.delayed=(e.time.counter<0)?true:false;
            let t = e.time.counter;
            let day = (Math.abs(Math.trunc(t/86400)).toString())+"d";
            let hou = ("0"+Math.abs(Math.trunc(t/3600)%24).toString()).slice(-2);
            let min = ("0"+Math.abs(Math.trunc(t/60)%60).toString()).slice(-2);
            let seg = ("0"+Math.abs(t%60).toString()).slice(-2);
            if(day=="0d"){
              if(hou=="00"){
                e.countdown=`${min}:${seg}`;
              }
              else{
                e.countdown=`${hou}:${min}:${seg}`;
              }
            }
            else{
              e.countdown=`${day}:${hou}:${min}:${seg}`;
            }
          },1000) 
        }
      });
    }
  }

}
