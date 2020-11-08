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
}
