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
    const raw = JSON.stringify({ username: data['user'], password: data['pass'], email: data['email'], rol:'CLIENTE' });
    console.log(raw);
    this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return this.http.post(`${this.urls.urlsToLogin.signUp}`, raw, { headers: this.header });
  }

  forget = (data) =>{
    const raw = JSON.stringify({ email: data['email']});
    console.log(raw);
    this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return this.http.post(`${this.urls.urlsToLogin.forget}`, raw, { headers: this.header });
  }

  validate = (data) =>{
    const raw = JSON.stringify({ restore: data['code'], email: data['email']});
    console.log(raw);
    this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return this.http.post(`${this.urls.urlsToLogin.validate}`, raw, { headers: this.header });
  }

  restore = (data) =>{
    console.log(data);
    const raw = JSON.stringify({ password: data.pass, email: data.email});
    console.log(raw);
    this.body = raw;
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return this.http.post(`${this.urls.urlsToLogin.restore}`, raw, { headers: this.header });
  }
}
