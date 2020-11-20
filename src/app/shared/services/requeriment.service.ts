import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../model/url.model';

@Injectable({
  providedIn: 'root'
})
export class RequerimentService {

  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient,) { }


  async newRequeriment(requeriment){
      let raw = JSON.stringify(requeriment);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization","Bearer "+localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlToRequeriment.new}`,raw, { headers: this.header , observe: 'response'});
  }

  async getStates(){
      console.log(`${this.urls.urlToRequeriment.states}`);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization","Bearer "+localStorage.getItem('id'))
    return this.http.get(`${this.urls.urlToRequeriment.states}`, { headers: this.header , observe: 'response'}).toPromise();
  }

  async getRequerimentsByStates(id){
    console.log(`${this.urls.urlToRequeriment.states}`);
  this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization","Bearer "+localStorage.getItem('id'))
  return this.http.get(`${this.urls.urlToRequeriment.getById}${id}`, { headers: this.header , observe: 'response'}).toPromise();
}
}
