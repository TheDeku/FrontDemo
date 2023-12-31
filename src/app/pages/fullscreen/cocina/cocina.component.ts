import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Urls } from '../../../shared/model/url.model';
import { OrderService } from '../../../shared/services/order.service';
import { OrderToCardPipe } from '../../../pipes/order-to-card.pipe';
import { Router, RouterModule } from '@angular/router';
import { data } from 'jquery';
import { NsummarybarService,NsummaryData } from '../../../shared/components/componentComunication/nsummarybar.service';
import { MessagingService } from '../../../shared/services/messaging.service';
import { Subscription } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  msg= new Subscription();

  loading:boolean=true;
  orders:any={
    preparing:[],
    waiting:[]
  }

  constructor(
    private nsummary:NsummarybarService,
    private router:Router,
    private orderService:OrderService, 
    private orderPipe: OrderToCardPipe,
    private mesaggingService:MessagingService
    
  ) { 
    this.load();
  }

  navigate(url:string){
    this.router.navigate([url]);
  }

  load(){
    this.loading=true;
    this.orderService.getall().toPromise().then(o=>{
      console.log(o.status);
      let ordrs=o.body;
      console.log(ordrs);
      this.orders=[];
      this.orders = this.orderPipe.transform(ordrs); 
      this.loading=false;
      console.log(ordrs)
    }).catch(e=>{console.log(e);
      if(e.error.statusCode== 401)
      this.navigate("/signin") });
  }

  changestate(order){
    this.loading=true;
    this.orderService.setState(order.id,order.state+1).toPromise().then(norder=>{
      let dlog = new NsummaryData()

      let io1 = this.orders.waiting.findIndex(o=>o.id==order.id);
      let io2 = this.orders.prepairing.findIndex(o=>o.id==order.id);

      if(io1!=-1){
        let orderold = this.orders.waiting.splice(io1,1)[0];
        let ordermove = this.orderPipe.transform([norder]).prepairing[0];
        console.log(ordermove);

        orderold.preparing=ordermove.preparing;
        orderold.time.timeref = ordermove.time.timeref;
        orderold.time.counter = ordermove.time.counter;
        orderold.pedidoeId= ordermove.pedidoeId;

        dlog.text = orderold["nomMesa"];
        dlog.type = (orderold["time"]["delayed"])?"delayed":"onTime";

        this.orders.prepairing.push(orderold);
      }
      if(io2!=-1){
        let orderold = this.orders.prepairing.splice(io2,1)[0];

        dlog.text = orderold["nomMesa"];
        dlog.state="preparing"
        dlog.type = (orderold["time"]["delayed"])?"delayed":"onTime";
      }
      this.loading=false;

      this.nsummary.nsummaryLog(dlog);

    }).catch(e=>{console.log(e);this.navigate("/signin") });

    
  }

  async ngOnInit(){
    await this.mesaggingService.requestPermission();
    this.mesaggingService.receiveMessage();
    this.msg = this.mesaggingService.currentMessage.subscribe((mensaje)=>{
      console.log(mensaje);
      this.load();
    }) 
  }
  OnDestroy(){
    this.msg.unsubscribe()
  }

}
