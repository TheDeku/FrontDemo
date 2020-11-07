import { Pipe, PipeTransform } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

@Pipe({
  name: 'orderToCard'
})
export class OrderToCardPipe implements PipeTransform {

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
          order.multi=true
        }
      }

      if(order["pedidoeId"]==1){ 
        order.preparing = false;
        orders.waiting.push(order)}
      if(order["pedidoeId"]==2){ 
        order.preparing = true;
        orders.prepairing.push(order)}
    }
    console.log(orders);
    return orders;
  }

}
