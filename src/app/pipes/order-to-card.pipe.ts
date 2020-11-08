import { Pipe, PipeTransform } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

@Pipe({
  name: 'orderToCard'
})
export class OrderToCardPipe implements PipeTransform {

  manualadjust=3;

  transform(rawOrders:any): any {
    console.log(rawOrders);
    let orders={
      waiting:[],
      prepairing:[]
    }
    for (const order of rawOrders) {
      order.nomMesa = (order["mesa"]!=null)? order["mesa"]["nombre"]: "Mesa";


      if(order["pedProds"]!=null){
        if(order["pedProds"].length==1){
          order.multi=false;
          order.porcion=order["pedProds"][0]["cantidad"];
          order.imagen=order["pedProds"][0]["producto"]["imagen"];
          order.nombre=order["pedProds"][0]["producto"]["nombre"];
        }
        else{
          order.multi=true;
          let porciones=0;
          for (const prod of order["pedProds"]) {
            porciones += prod["cantidad"];
          }
          order.porcion=porciones;
        }
      }

      if(order["pedidoeId"]==2){ 
        order.time={};
        order.time.timeref = order.fecha;
        order.preparing = false;
        orders.waiting.push(order)}
      if(order["pedidoeId"]==3){ 
        order.time={};
        order.time.timeref = order.tiempoIngreso;
        order.preparing = true;
        orders.prepairing.push(order)}

      if(order["pedidoeId"]==2 || order["pedidoeId"]==3){
        let ti = new Date(order.time.timeref).getTime() - this.manualadjust*3600000;
        let ta = new Date().getTime()
        order.time.counter= Math.trunc((ti+(5000*60)-ta)/1000);
      }
    }
    console.log(orders);
    return orders;
  }

}
