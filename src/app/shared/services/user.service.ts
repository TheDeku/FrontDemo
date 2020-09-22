import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../model/url.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urls: Urls = new Urls();
  private header;
  private body;

  constructor(private http: HttpClient,) { }

  signIn = (data) => {
    const raw = JSON.stringify({ username: data['user'], password: data['password'] });
    console.log(this.urls.urlsToLogin.signIn);
    //this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
    // console.log(this.header);
    // console.log(this.body);
    // console.log(localStorage.getItem('token_sesion'))
    return this.http.post(`${this.urls.urlsToLogin.signIn}`, raw, { headers: this.header });
  }

  signUp = (data) => {
    const raw = JSON.stringify({ username: data['user'], password: data['password'] });
    this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return this.http.post(`${this.urls.urlsToLogin.signUp}`, raw, { headers: this.header });
  }
}
