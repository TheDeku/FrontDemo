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
    this.orderService.getall().toPromise().then(orders=>{
      this.orders = orderPipe.transform(orders); 
      this.loading=false
    }).catch(e=>{console.log(e);this.navigate("/signin") });
  }

  navigate(url:string){
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    
  }

}
