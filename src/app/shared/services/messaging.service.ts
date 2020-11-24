import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { Urls } from '../model/url.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { readyException } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
 
constructor(
  private angularFireMessaging: AngularFireMessaging,
  private http: HttpClient,
  ) { }
  private urls: Urls = new Urls();
  private header;
 
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
    console.log(token);
    let userDevice={
      userId:null,
      deviceId:"",
      DeviceToken:token
    }
    let raw=JSON.stringify(userDevice);
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set("Authorization","Bearer "+localStorage.getItem('id'))
    this.http.post(`${this.urls.deviceUrl}`,raw, { headers: this.header , observe: 'response'}).toPromise()
    .then(()=>{
      return true}).catch((err)=>{
        if(err.sqlMessage == "already register"){
          console.log("msg token alredy register");
          return true
        }
        else{
          return false
        }
      });
    });
  }
 
  receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
        (msg) => {
        this.currentMessage.next(msg);
          });
          return true;
    }
    
}