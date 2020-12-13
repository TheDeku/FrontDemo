import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VendorService } from '../services/vender.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { HistoricalService } from '../../../shared/services/historical.service';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HistoricalComponent implements OnInit {


  opts = [
    {
      nombre: "Hoy",
      id: 0
    },
    {
      nombre: "Buscar por Fecha",
      id: 1
    },
    {
      nombre: "Historial Mes",
      id: 2
    }
  ]
  itemView = {
    chartToday: {
      state: false,
      idPrint:"today",
      request: {
        date: "",
        type:"SALESMOD"
      },
  
      result:[]
    },
    chartMonth: {
      state: false,
      showChart:false,
      idPrint:"chart",
      request: {
        date: "",
        type:"SALESTA"
      }
    },
    chartDate: {
      state: false,
      idPrint:"date",
      request: {
        date: "",
        type:"SALESMOD"
      }
    }
  }
  events: string[] = [];
  date = new FormControl(moment());
  constructor(private _historicalService:HistoricalService) {
    console.log(this.opts);
  }


  ngOnInit(): void {

  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let value = event.value["_d"].toISOString();
    this.itemView.chartDate.request.date = value;
    this._historicalService.getaVoucherData(this.itemView.chartDate.request).then(resp=>{
      console.log(resp);
      this.itemView.chartToday.result = resp[0];
    });
  }
  selectOpt(id) {
    switch (id) {
      case 0:
        this.itemView.chartToday.state = true;
        this.itemView.chartMonth.state = false;
        this.itemView.chartDate.state = false;
        this.itemView.chartToday.request.date = new Date().toISOString();
        console.log(this.itemView);
        this._historicalService.getaVoucherData(this.itemView.chartToday.request).then(resp=>{
          console.log(resp);
          this.itemView.chartToday.result = resp[0];
        });
        break;
      case 1:
        this.itemView.chartToday.state = false;
        this.itemView.chartMonth.state = false;
        this.itemView.chartDate.state = true;
        break;
      case 2:
        this.itemView.chartToday.state = false;
        this.itemView.chartMonth.state = true;
        this.itemView.chartDate.state = false;
        break;
      default:
        break;
    }
  }




  chosenYearHandler(normalizedYear: Moment) {
    this.itemView.chartMonth.showChart = false;
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    let value = this.date.value._d.toISOString();
    console.log(value);
    this.itemView.chartMonth.request.date = value;
    this.itemView.chartMonth.showChart = true;
    datepicker.close();

  }

  onPrint(id:string){
    let data = document.getElementById(id)
    html2canvas(data).then(function(canvas) {
      let imgData = canvas.toDataURL(
        'image/png');              
    let doc = new jsPDF('l', 'px','a4',true);
    doc.addImage(imgData,'PNG',0,0,600,0,);
    doc.save('Informe.pdf');
  });
  }

}
