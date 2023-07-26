import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class NsummarybarService {
  
  private logSource = new Subject<NsummaryData>();
  //private dataSource2 = new Subject<string>();

  datalog = this.logSource.asObservable();
  //data2 = this.dataSource2.asObservable();

  nsummaryLog(dat:NsummaryData){
    this.logSource.next(dat);
  }

  /* Fdata2(dat:string){
    this.dataSource2.next(dat);
  }
 */
  constructor() { }
}

export class NsummaryData{

    text:string | null;

    date1:Date | null;

    state:string | null;

    type:string | null;

    stamp:string | null;

}