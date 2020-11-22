import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../model/url.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RequerimentService {

  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient,) { }


  async newRequeriment(requeriment) {
    let raw = JSON.stringify(requeriment);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlToRequeriment.new}`, raw, { headers: this.header, observe: 'response' });
  }

  async getStates() {
    console.log(`${this.urls.urlToRequeriment.states}`);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.get(`${this.urls.urlToRequeriment.states}`, { headers: this.header, observe: 'response' }).toPromise();
  }

  async getRequerimentsByStates(id) {
    console.log(`${this.urls.urlToRequeriment.states}`);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.get(`${this.urls.urlToRequeriment.getById}${id}`, { headers: this.header, observe: 'response' }).toPromise();
  }



  async updState(item, estado) {
    console.log(item);

    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(Date.now(), 'yyyy-MM-dd H:mm:ss');
    let raw = JSON.stringify({
      id: item.id,
      estado: estado,
      costo: item.costo,
      fecha: formattedDate,
      tipo: item.tipo
    });
    console.log(raw);
    console.log(`${this.urls.urlToRequeriment.update}`);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${this.urls.urlToRequeriment.update}`,raw, { headers: this.header, observe: 'response' }).toPromise();
  }

  async updStateAndData(data) {
    console.log(data);
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(Date.now(), 'yyyy-MM-dd H:mm:ss');
    const dataRaw = {
      id: data.item.id,
      estado: data.stateId,
      costo: data.item.costo,
      fecha: formattedDate,
      tipo: data.item.tipo,
      Ingredients:[]
    };
    await Promise.all(data.data.map(ingSol=>{
      let ing = {id:ingSol.ingrediente.id,quantityDelivered:ingSol.cantidadEntregada};
      dataRaw.Ingredients.push(ing);
    }))

    let raw = JSON.stringify(dataRaw);
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    // return this.http.put(`${this.urls.urlToRequeriment.update}`,raw, { headers: this.header, observe: 'response' }).toPromise();
    return this.http.put(`http://localhost:5012/update`,raw, { headers: this.header, observe: 'response' }).toPromise();
  }
}
