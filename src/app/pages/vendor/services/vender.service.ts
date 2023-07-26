import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Urls } from 'src/app/shared/model/url.model';

@Injectable({
    providedIn: 'root'
  })
  export class VendorService {

    private urls: Urls = new Urls();
    private header;

    constructor(private http: HttpClient){}

    async findOrderByUserOrTable(type:string,value){
        let url:string;
        let raw = JSON.stringify(value);
        if (type==="user") {
           url = this.urls.urlOrders.byUser;
        } else if (type==="table") {
            url = this.urls.urlOrders.byTable;
        }

        console.log(url);

        this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.post(url,raw, { headers: this.header }).toPromise();
    }

    async doNewPayment(values){
        let raw = JSON.stringify(values);
        console.log(raw);
        this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.post(`${this.urls.urlToPay}`,raw, { headers: this.header }).toPromise();
    }

    async getTables(){
        this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.get(`${this.urls.urlToTable}`, { headers: this.header }).toPromise();
      }


    async getUserMyMail(mail:string){
        console.log(JSON.stringify(mail));
        this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.post(`${this.urls.urlsToUsers.userByMail}`,JSON.stringify({email:mail}), { headers: this.header }).toPromise();
    }


  }