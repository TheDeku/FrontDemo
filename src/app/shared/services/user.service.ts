import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlToLogin = 'http://174.138.108.5:5004/api/auth/signin';
  private body;
  private header;

  constructor(private http: HttpClient) { }

  // loginToItam = (data) => {
  //   this.body = new FormData();
  //   console.log(data);
  //   this.body.append('username', data['user']);
  //   this.body.append('password', data['password'])


  //   return this.http.post(`${this.urlToLogin}`, this.body);
  // }




  signIn = (data) => {
    const raw = JSON.stringify({ username: data['user'], password: data['password'] });
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
    // console.log(this.header);
    // console.log(this.body);
    // console.log(localStorage.getItem('token_sesion'))
    return this.http.post(`${this.urlToLogin}`, raw, { headers: this.header });
  }
}
