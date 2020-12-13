import { Urls } from '../../../shared/model/url.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

  
  
    private urls: Urls = new Urls();
    private header;

    constructor(private http:HttpClient){

    }
    async NewCatOrSub(request){
      let url;
      let raw = JSON.stringify(request);

      if (request.type==="CAT") {
        url = this.urls.urlsToProducts.newCat;
      }else if(request.type==="SUBCAT"){
        url = this.urls.urlsToProducts.newSubCat;
      }else if (request.type==="PROD") {
        url = this.urls.urlsToProducts.newProd;
      }
      console.log(url);
      console.log(raw);
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${url}`,raw, { headers: this.header }).toPromise();
  }


  async delProduct(id: any) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.delete(`${this.urls.urlsToProducts.delProd}${id}`, { headers: this.header }).toPromise();
  }

  async NewRecipe(request){
    let raw = JSON.stringify(request);
    console.log(raw);
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.post(`${this.urls.urlsToRecipe.NewRecipe}`,raw, { headers: this.header }).toPromise();
}

    async getCategories(){
        this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.get(`${this.urls.urlsToProducts.getCategories}`, { headers: this.header }).toPromise();
    }

    async getRecipe(productID){
      this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToRecipe.getRecipe}${productID}`, { headers: this.header }).toPromise();
    }



    async getCategoriesIng() {

      this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.get(`${this.urls.urlsToWarehouse.getCategories}`, { headers: this.header }).toPromise();
    }

    async getIngByCat(id) {
      console.log(`https://api.watasoft.com/ingredient/bycategory/3${this.urls.urlsToWarehouse.findByCategory}/${id}`);
      this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return await this.http.get(`${this.urls.urlsToWarehouse.findByCategory}/${id}`, { headers: this.header, observe: 'response' }).toPromise();
    }
}