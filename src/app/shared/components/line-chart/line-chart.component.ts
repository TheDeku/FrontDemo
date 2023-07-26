import { DatePipe } from '@angular/common';
import { Component, Input, LOCALE_ID, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { start } from '@popperjs/core';
import * as moment from 'moment';
import { HistoricalService } from '../../services/historical.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {


  @Input()
  requestData; any;

  @Output()
  loading = new EventEmitter<boolean>();;
  chartData = [
    { data: [], label: '' },
  ];
  chartLabels = [];
  chartOptions = {
    responsive: true,
  };
  chartColors = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(20,255,0,0.3)',
    },
  ];
  chartLegend = true;
  chartPlugins = [];
  constructor(private _historicalService: HistoricalService) {

  }

  async ngOnInit() {
    console.log(this.requestData);
    this.procesData()
  }

  procesData() {
    switch (this.requestData.type) {
      case "SALESTA":
        this.getSalesta()
        break;
      case "INGREDIENTE":
        this.getIngredients()
        break;

      default:
        break;
    }
  }
  async getSalesta() {
    if (this.requestData.typeQuery != "ADMIN") {
      let dataArr: number[] = [];
      let quantity:number=0;
      await Promise.all(this.getDays(this.requestData.date).map(day=>{
        let date = new Date(day);
        this.chartLabels.push(date.toLocaleDateString("es-cl", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }));
        dataArr.push(quantity);
      }))
      await this._historicalService.getaVoucherChart(this.requestData).then(async resp => {
        console.log(resp['0']);
        let items: any;
        items = resp['0'];

        await Promise.all(items.map(resource => {
 
          let dateString: string = resource.dia;
          let date = new Date(dateString.substring(0, 10))
          let index  = this.chartLabels.indexOf(date.toLocaleDateString("es-cl", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }))
          dataArr[index]=resource.total;
        }))
        this.chartData = []
        let date = new Date(this.requestData.date)
        this.chartLegend = false;
        this.chartData.push({ data: dataArr, label: date.toLocaleDateString("es-cl", { month: 'long' }) })
        this.loading.emit(false)
      });
    } else {


      let dataArr: number[] = [];
      let quantity:number=0;
      await Promise.all(this.getDays(this.requestData.date).map(day=>{
        let date = new Date(day);
        this.chartLabels.push(date.toLocaleDateString("es-cl", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }));
        dataArr.push(quantity);
      }))
      this.chartData = []
      console.log(dataArr);
      await Promise.all(this.requestData.user.map(async user => {
        let dataUse=[]
        let request = {
          date: this.requestData.date,
          type: this.requestData.type,
          typeQuery: this.requestData.typeQuery,
          user: user
        }
        await this._historicalService.getaVoucherChartAdmin(request).then(async resp=>{

          let items: any;
          items = resp['0'];
          await Promise.all(items.map(resource => {
            let dateString: string = resource.dia;
            let date = new Date(dateString)
            let index  = this.chartLabels.indexOf(date.toLocaleDateString("es-cl", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }))
            dataUse[index]=resource.total;
          }))
          for (let index = 0; index < dataArr.length; index++) {
            if (dataUse[index]===undefined) {
              dataUse[index] = 0;
            }
            
          }
          console.log(dataUse);
        });

        this.chartData.push({ data: dataUse, label: user.usuDet.nombre })
        this.loading.emit(false)
        this.chartColors = [
          {
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
          {
            borderColor: 'green',
            backgroundColor: 'rgba(20,255,0,0.3)',
          },
        ];
      }))

    }

  }
  async getIngredients() {
    await this._historicalService.getaIngredientChart({ type: "INGREDIENTE", date: "2020-11", ingId: 72 }).then(async resp => {
      console.log(resp['0']);
      let items: any;
      items = resp['0'];
      let dataArr: number[] = [];
      await Promise.all(items.map(algo => {
        dataArr.push(algo.CANTIDAD_NEW)
        let dateString: string = algo.FECHA;
        let date = new Date(dateString.substring(0, 10))
        this.chartLabels.push(date.toLocaleDateString("es-cl", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }))
      }))
      this.chartData = []
      
      this.chartData.push({ data: dataArr, label: 'Tomate' })
    })
  }

  getDays(fecha){
    var date = new Date(fecha), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    console.log(firstDay);
    console.log(lastDay);
    let days = []
    let dateStart = moment(firstDay)
    let dateEnd = moment(lastDay)
    

    console.log(dateStart);
    console.log(dateEnd);

    while (dateEnd.diff(dateStart, 'days') >= 0) {
     days.push(dateStart.format('YYYY-MM-DD'))
     dateStart.add(1, 'days')
    }
    return days
   }
   

}
