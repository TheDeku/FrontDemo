import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../model/url.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient) { }

  getaIngredientChart(values) {
    console.log(values);
    let raw = JSON.stringify({
      type: values.type,
      content: {
        "fecha": values.date,
        "INGREDIENTE_ID": values.ingId
      }
    })

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${this.urls.urlHistorical.getDataServiceHistorical}`, raw, { headers: this.header }).toPromise();
  }


  getaVoucherData(values) {
    console.log(values);

    console.log(`${this.urls.urlHistorical.getDataServiceHistorical}`);
    let raw = JSON.stringify({
      type: values.type,
      content: {
        "fecha": values.date.split("T")[0],
      }
    })
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${this.urls.urlHistorical.getDataServiceHistorical}`, raw, { headers: this.header }).toPromise();
  }

  getaVoucherChart(values) {
    console.log(values);
    let raw;
    let url;
    let valueString: string = values.date.split("T")[0];
    if (values.typeQuery==="CAJERO") {
      url = this.urls.urlHistorical.getDataServiceHistoricalAdmin;
      raw = JSON.stringify({
        type: values.type,
        content: {
          "fecha": valueString.substr(0, valueString.length - 3)
        },
        user: values.user
      })
    }else{
      url = this.urls.urlHistorical.getDataServiceHistorical;
      raw = JSON.stringify({
        type: values.type,
        content: {
          "fecha": valueString.substr(0, valueString.length - 3)
        }
      })
    }
    // console.log(valueString.substr(0, valueString.length - 3));
    // console.log(`${this.urls.urlHistorical.getDataServiceHistorical}`);
    // let raw = JSON.stringify({
    //   type: values.type,
    //   content: {
    //     "fecha": valueString.substr(0, valueString.length - 3)
    //   }
    // })
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${url}`, raw, { headers: this.header }).toPromise();
  }


  getaVoucherDataAdmin(values) {
    console.log(values);

    console.log(`${this.urls.urlHistorical.getDataServiceHistorical}`);
    let raw = JSON.stringify({
      type: values.type,
      user:{
        id: values.user.id},
      content: {
        fecha: values.date.split("T")[0],
        type: values.typeQuery
      },
      
    })
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${this.urls.urlHistorical.getDataServiceHistoricalAdmin}`, raw, { headers: this.header }).toPromise();
  }

  getaVoucherChartAdmin(values) {
    let valueString: string = values.date.split("T")[0];
    console.log(valueString.substr(0, valueString.length - 3));
    console.log(`${this.urls.urlHistorical.getDataServiceHistorical}`);
    let raw = JSON.stringify({
      type: values.type,
      user:{
          id:values.user.id},
      content: {
        fecha: valueString.substr(0, valueString.length - 3),
        type: values.typeQuery
      }
    })
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return this.http.post(`${this.urls.urlHistorical.getDataServiceHistoricalAdmin}`, raw, { headers: this.header }).toPromise();
  }

}
