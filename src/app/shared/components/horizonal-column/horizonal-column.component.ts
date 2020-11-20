import { Component, Input, OnInit } from "@angular/core";
import { RequerimentService } from '../../services/requeriment.service';


@Component({
  selector: 'app-horizonal-column',
  templateUrl: './horizonal-column.component.html',
  styleUrls: ['./horizonal-column.component.css']
})
export class HorizonalColumnComponent implements OnInit {



  horizontalItems:any=[];

  constructor(private _requerimentService:RequerimentService) { }

  async ngOnInit(): Promise<void> {
   await this._requerimentService.getStates().then(resp=>{
     console.log(resp.body);
      this.horizontalItems = resp.body;
    })
  }

}
