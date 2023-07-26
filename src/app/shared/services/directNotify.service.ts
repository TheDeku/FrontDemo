import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { Urls } from '../model/url.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { readyException } from 'jquery';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class DirectNotifyService {

    private urls: Urls = new Urls();
    private header;
  
    constructor(private http: HttpClient,) { }
  
    async sendDirectPushEvent(userid:number,eventtype:string) {
      this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
        let ev = new PushEventDTO();
        ev.custom.type=eventtype;
      return this.http.post(`${this.urls.urlToNotify}${userid}`,JSON.stringify(ev), { headers: this.header, observe: 'response' }).toPromise();
    }

    async sendDirectPushNotification(userid:number,notification:PushNotificationDTO) {
      this.header = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set("Authorization", "Bearer " + localStorage.getItem('id'))
      return this.http.post(`${this.urls.urlToNotify}${userid}`,JSON.stringify(notification), { headers: this.header, observe: 'response' }).toPromise();
    }
    
}

//////dtata transport objects////////////

export class PushEventDTO{
    constructor(){
        this.custom={type:""}
    }
custom:{
    type:string,
    entity?:string,
    aditionalinfo?:any,
    foreground?:boolean
}
}
export class PushNotificationDTO{
    title:string
    body:string
    image?:string
    badge?:number|null
    soundname?: string|null
    custom?:{
        type:string 
        entity?:string
        aditionalinfo?:string
        foreground?:any
    }
}