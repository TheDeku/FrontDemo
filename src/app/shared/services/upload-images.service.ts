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
export class UploadImagesService {

    constructor(private firebaseApp: FirebaseApp) {

    }


    uploadImageProduct(image: string) {


    }





}