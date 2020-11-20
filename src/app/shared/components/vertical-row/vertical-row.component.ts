import { Component, Input, OnInit } from "@angular/core";
import { RequerimentService } from '../../services/requeriment.service';


@Component({
  selector: 'app-vertical-row',
  templateUrl: './vertical-row.component.html',
  styleUrls: ['./vertical-row.component.css']
})
export class VerticalRowComponent implements OnInit {
  @Input()
  idState
  
  verticalItems;
  constructor(private _requerimentService:RequerimentService) { }

  async ngOnInit(): Promise<void> {
    await this._requerimentService.getRequerimentsByStates(this.idState).then(resp=>{
      console.log(resp.body);
      this.verticalItems = resp.body;
    })
  }

}
