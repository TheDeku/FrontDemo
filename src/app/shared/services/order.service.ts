import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../model/url.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient,) { }

  getall = () => {
    console.log(this.urls.urlOrders.all);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization","Bearer "+localStorage.getItem('id'))
    return this.http.get(`${this.urls.urlOrders.all}`, { headers: this.header , observe: 'response'});
  }

  setState = (id,state) => {
    console.log(this.urls.urlOrders.setState+id);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization","Bearer "+localStorage.getItem('id'))
    return this.http.put(`${this.urls.urlOrders.setState}${id}`,{state}, { headers: this.header });
  }
}
