import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../../../shared/model/url.model';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {


  private urls: Urls = new Urls();
  private header;

  constructor(private http: HttpClient,) { }

  async getUsers(query:any) {
    console.log(this.urls.urlsToUsers.getUsers);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlsToUsers.getUsers}`, query, { headers: this.header }).toPromise();
  }

  async getRoles() {
    console.log(this.urls.urlsToUsers.getRoles);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.get(`${this.urls.urlsToUsers.getRoles}`, { headers: this.header }).toPromise();
  }

  async modifyUserDetail(value: any) {
    console.log(this.urls.urlsToUsers.modUserDetail);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set("Authorization", "Bearer " + localStorage.getItem('id'))
    return await this.http.post(`${this.urls.urlsToUsers.modUserDetail}`,value, { headers: this.header }).toPromise();
  }


  
  async createWorker(user){
    const raw = JSON.stringify({ username: user.user, password: user.pass, email: user.email, rol:user.rol });
    console.log(raw);
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

      console.log(this.urls.urlsToLogin.signUp);
    await this.http.post(`${this.urls.urlsToLogin.signUp}`, raw, { headers: this.header }).toPromise().then(async resp=>{
      console.log(resp['value'].id);
      user.usuarioId = parseInt( resp['value'].id);
      await this.modifyUserDetail(user).then(resp=>{
        console.log(resp);
      }).catch(err=>{
        console.error(err);
      });
    }).catch(err=>{
      return err;
    });
  }
}
