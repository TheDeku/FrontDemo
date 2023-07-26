import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Urls } from '../../../shared/model/url.model';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {


  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient,) { }

  //users config
  async getUsers(query: any) {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlsToUsers.getUsers}`, query, { headers: this.header }).toPromise();
  }
  async getRoles() {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToUsers.getRoles}`, { headers: this.header }).toPromise();
  }
  async modifyUserDetail(value: any) {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlsToUsers.modUserDetail}`, value, { headers: this.header }).toPromise();
  }

  async deleteUser(value: any) {
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.delete(`${this.urls.urlsToUsers.deleteUser}${value.id}`, { headers: this.header }).toPromise();
  }

  async createWorker(user) {
    const raw = JSON.stringify({ username: user.user, password: user.pass, email: user.email, rol: user.rol });

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')


    await this.http.post(`${this.urls.urlsToLogin.signUp}`, raw, { headers: this.header }).toPromise().then(async resp => {
      user.usuarioId = parseInt(resp['value'].id);
      await this.modifyUserDetail(user).then(resp => {
        console.log(resp);
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      return err;
    });
  }

  //warehouse config

  async getCategories() {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToWarehouse.getCategories}`, { headers: this.header }).toPromise();
  }

  async getingredients() {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToWarehouse.getIngredients}`, { headers: this.header }).toPromise();
  }
  async getUnits() {

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToWarehouse.getUnits}`, { headers: this.header }).toPromise();
  }

  async createResource(values) {
    let url;
    let raw
    let response;
    if (values.selected === 'CAT') {
      raw = JSON.stringify({
        nombre: values.categoryName,
        descripcion: values.categoryDescrip
      });
      url = this.urls.urlsToWarehouse.createCategory;
    } else if (values.selected === 'ING') {
      raw = JSON.stringify({
        nombre: values.imgName,
        cantidadTotal: values.imgQuantity,
        descripcion: values.imgDesc,
        volumenTotal: values.imgVol,
        unidadId: values.idUnit,
        catIngId: values.idCat,
        ingredienteDetalles:[{
          marca: values.imgDetMarca,
          cantidad: values.imgQuantity,
          formato: values.imgDetFormat,
          barcode: values.imgBarcode
        }]
      });
      url = this.urls.urlsToWarehouse.createIngredient;
    } else if (values.selected === 'MED') {
      raw = JSON.stringify({
        sufix: values.unitName,
        descripcion: values.unitDescrip
      });
      url = this.urls.urlsToWarehouse.createUnits;
    }
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    await this.http.post(`${url}`, raw, { headers: this.header, observe: 'response' }).toPromise().then(async resp => {
      console.log(resp);
      response= {body:resp.body,status:resp.status};
    }).catch(err => {
      console.log(err);
    })
    return response;
  }

  async updateIng(values) {
    let raw
    let url;
    let response = {ingredient:{},detail:{},status:0,ok:false}
    raw = JSON.stringify({
      nombre: values.imgName,
      cantidadTotal: values.imgQuantity,
      descripcion: values.imgDesc,
      volumenTotal: values.imgVol,
      unidadId: values.idUnit,
      catIngId: values.idCat
    });
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
    url = this.urls.urlsToWarehouse.createIngredient + `/${values.id}`;
    await this.http.put(`${url}`, raw, { headers: this.header, observe: 'response' }).toPromise().then(async resp => {
      console.log(resp);
      response.ingredient = resp.body;
      response.status = resp.status;
      response.ok = resp.ok;
    }).catch(err => {
      console.log(err);
      response.ok = err.ok;
      response.status = err.status;
    })


    raw = JSON.stringify({
      marca: values.imgDetMarca,
      cantidad: values.imgQuantity,
      formato: values.imgDetFormat,
      ingredienteId: values.id,
      barcode: values.imgBarcode,
    })
    console.log(raw);
    console.log(`${this.urls.urlsToWarehouse.createIngredientDetail}/${values.idDet}`);
    await this.http.put(`${this.urls.urlsToWarehouse.createIngredientDetail}/${values.idDet}`, raw, { headers: this.header, observe: 'response' }).toPromise().then(resp => {
      console.log(resp);
      response.detail = resp.body;
      response.status = resp.status;
      response.ok = resp.ok;
    }).catch(err=>{
      console.log(err);
      response.status = err.status;
      response.ok = err.ok;
    });
    return response;
  }

  async deleteIng(value){

    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.delete(`${this.urls.urlsToWarehouse.createIngredient}/${value}`, { headers: this.header, observe: 'response' }).toPromise();
  }


  async getIngByCat(id) {
    console.log(`https://api.watasoft.com/ingredient/bycategory/3${this.urls.urlsToWarehouse.findByCategory}/${id}`);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToWarehouse.findByCategory}/${id}`, { headers: this.header, observe: 'response' }).toPromise();
  }


  async createTable(table){
    let raw= JSON.stringify({
      name:table.name,
      capacity:table.capacity
    })
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.post(`${this.urls.urlToTable}/`,raw, { headers: this.header }).toPromise();
  }

  async updateTable(table){
    let raw= JSON.stringify({
      id:table.id,
      name:table.name,
      capacity:table.capacity,
      mesaE:table.state
    })
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.put(`${this.urls.urlToTable}/`,raw, { headers: this.header }).toPromise();
  }

  async deleteTable(id:number){
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.delete(`${this.urls.urlToTable}/${id}`, { headers: this.header }).toPromise();
  }

  async getTables(){
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'))
  return await this.http.get(`${this.urls.urlToTable}`, { headers: this.header }).toPromise();
  }

  async getTablesStates(){
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'));
  return await this.http.post(`${this.urls.urlToTable}/states`, { headers: this.header }).toPromise();
  }

  async getTablesByStates(id){
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization", "Bearer " + localStorage.getItem('id'));
  return await this.http.post(`${this.urls.urlToTable}/states/${id}`,{}, { headers: this.header }).toPromise();
  }


}
