import { Component, OnInit } from '@angular/core';
import { Urls } from '../../../shared/model/url.model';
import { OrderService } from '../../../shared/services/order.service';
import { OrderToCardPipe } from '../../../pipes/order-to-card.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  loading:boolean=true;
  orders:any={
    preparing:[],
    waiting:[]
  }

  constructor(private router:Router,private orderService:OrderService, private orderPipe: OrderToCardPipe) { 
    this.load();
  }

  navigate(url:string){
    this.router.navigate([url]);
  }

  load(){
    this.loading=true;
    this.orderService.getall().toPromise().then(ordrs=>{
      this.orders=[];
      this.orders = this.orderPipe.transform(ordrs); 
      this.loading=false;
      console.log(ordrs)
    }).catch(e=>{console.log(e);this.navigate("/signin") });
  }

  changestate(order){
    this.loading=true;
    this.orderService.setState(order.id,order.state+1).toPromise().then(norder=>{
      
      /* let io1 = this.orders.waiting.findIndex(o=>o.id==order.id);
      let io2 = this.orders.prepairing.findIndex(o=>o.id==order.id);

      if(io1!=-1){
        let ordermove = this.orders.waiting.splice(io1,1)[0];
        ordermove.preparing=true;
        ordermove.time.timeref = norder["tiempoIngreso"];
        let ti = new Date(norder["tiempoIngreso"]).getTime();
        let ta = new Date().getTime()
        ordermove.time.counter= Math.trunc((ti+(5000*60)-ta)/1000);
        this.orders.prepairing.push(ordermove);
      }

      if(io2!=-1){
        this.orders.prepairing.splice(io2,1);
      } */
      
      this.loading=false;
      this.load();
    }).catch(e=>{console.log(e);this.navigate("/signin") });
  }

  ngOnInit(): void {
    
  }

}
