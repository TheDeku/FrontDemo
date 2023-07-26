import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../admin-services/user-admin.service';
import { HistoricalService } from '../../../shared/services/historical.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
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
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
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
export class FinanceComponent implements OnInit {

  opts = [
    {
      nombre: "Por cajero",
      id: 0
    },
    {
      nombre: "Todos los cajeros",
      id: 1
    }
  ]
  optsFilters = [
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
  cajeros={state:false,space:true,data:{}};
  cajeroSelected;
  loading = false;

  itemView = {
    chartToday: {
      state: false,
      idPrint:"today",
      request: {
        date: "",
        type:"SALESMOD",
        user:{},
        typeQuery:""
      },
      result:[]
    },
    chartMonth: {
      state: false,
      showChart:false,
      idPrint:"chart",
      request: {
        date: "",
        type:"SALESTA",
        user:{},
        typeQuery:""
      }
    },
    chartDate: {
      state: false,
      idPrint:"date",
      request: {
        date: "",
        type:"SALESMOD",
        user:{},
        typeQuery:""
      },

    },
    showOpts:false,
    showText:false
  }
  events: string[] = [];
  date = new FormControl(moment());
  constructor(private _userAdmService: UserAdminService, private _historicalService: HistoricalService) { }

  ngOnInit(): void {
    this.loading = true
    this._userAdmService.getUsers({role:"CAJERO",size:0}).then(resp=>{
      console.log(resp);
      this.cajeros.data = resp;
      this.loading = false
    });
  }

  selectedCajero(cajero){
    console.log(cajero);
    this.cajeroSelected = cajero
  }


  selectOpt(opt) {
    console.log(opt);
    this.itemView.showOpts = true;
    switch (opt) {
      case 0:
      this.cajeros.state = true;
      this.cajeros.space = false;
        break;
      case 1:
        this.cajeros.state = false;
        this.cajeros.space = true;
        break;

      default:
        break;
    }
  }


  selectOptFilters(id) {
    this.loading = true;
    switch (id) {
      case 0:
        this.itemView.chartToday.state = true;
        this.itemView.chartMonth.state = false;
        this.itemView.chartDate.state = false;
        this.itemView.showText = false;
        this.itemView.chartToday.request.date = new Date().toISOString();

        if (this.cajeros.state) {
          console.log(this.itemView);
          this.itemView.chartToday.request.user = this.cajeroSelected;
          this.itemView.chartToday.request.typeQuery = "CAJERO"
          this._historicalService.getaVoucherDataAdmin(this.itemView.chartToday.request).then(resp=>{
            console.log(resp);
            this.itemView.chartToday.result = resp[0];
            this.loading = false;
          });
        }else{
          console.log(this.itemView);
          this.itemView.chartToday.request.typeQuery = "ADMIN"
          this._historicalService.getaVoucherDataAdmin(this.itemView.chartToday.request).then(resp=>{
            console.log(resp);
            this.itemView.chartToday.result = resp[0];
            this.loading = false;
          });
        }
        break;
      case 1:
        this.itemView.chartToday.state = false;
        this.itemView.chartMonth.state = false;
        this.itemView.chartDate.state = true;
        this.itemView.showText = true;
        break;
      case 2:
        this.itemView.chartToday.state = false;
        this.itemView.chartMonth.state = true;
        this.itemView.chartDate.state = false;
        this.itemView.showText = true;
        break;
      default:
        break;
    }
    this.loading = false;
  }



  chosenYearHandler(normalizedYear: Moment) {
    this.itemView.chartMonth.showChart = false;
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.loading = true;
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    let value = this.date.value._d.toISOString();
    console.log(value);
    if (this.cajeros.state) {
      this.itemView.chartMonth.request.date = value;
      this.itemView.chartMonth.request.user = this.cajeroSelected;
      this.itemView.chartMonth.request.typeQuery = "CAJERO"
      this.itemView.chartMonth.showChart = true;
      console.log(this.itemView.chartMonth);
    }else{
      this.itemView.chartMonth.request.date = value;
      this.itemView.chartMonth.request.user = this.cajeros.data;
      this.itemView.chartMonth.request.typeQuery = "ADMIN"
      this.itemView.chartMonth.showChart = true;
    }
    datepicker.close();

  }

  onPrint(id:string){
    let data = document.getElementById(id)
    html2canvas(data).then(function(canvas) {
      let imgData = canvas.toDataURL(
        'image/png');              
    let doc = new jsPDF('l', 'px');
    doc.addImage(imgData,'PNG',20,20,600,0,);
    doc.save('Informe.pdf');
  });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.loading = true;
    let value = event.value["_d"].toISOString();
    this.itemView.chartDate.request.date = value;
    if (this.cajeros.state) {
      this.itemView.chartDate.request.user = this.cajeroSelected;
      this.itemView.chartDate.request.typeQuery = "CAJERO"
      this._historicalService.getaVoucherDataAdmin(this.itemView.chartDate.request).then(resp=>{
        console.log(resp);
        this.itemView.chartToday.result = resp[0];
        this.loading = false;
      });
    }else{
      console.log(this.itemView);
      this.itemView.chartDate.request.typeQuery = "ADMIN"
      this._historicalService.getaVoucherDataAdmin(this.itemView.chartDate.request).then(resp=>{
        console.log(resp);
        this.itemView.chartToday.result = resp[0];
        this.loading = false;
      });
    }

  }
  output(event){
    this.loading = event;
  }
}
