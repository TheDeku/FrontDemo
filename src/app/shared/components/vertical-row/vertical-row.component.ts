import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequerimentService } from '../../services/requeriment.service';


@Component({
  selector: 'app-vertical-row',
  templateUrl: './vertical-row.component.html',
  styleUrls: ['./vertical-row.component.css']
})
export class VerticalRowComponent implements OnInit {
  @Input()
  idState
  @Output() 
  readyForUpdate = new EventEmitter<boolean>();
  panelOpenState = false;
  loading = true;
  verticalItems;
  validate = {
    admin: { state: false, name: "ADMIN" },
    warehouse: { state: false, name: "BODEGA" },
    cooking: { state: false, name: "COCINA" }
  }

  formVerticalRow = new FormGroup({
    item: new FormControl(0),
  })
  states;
  selectedState;
  updateSelected = { alone: true, multi: false, category: [{ id: 0, name: "Actualizar estado" }, { id: 1, name: "Actualizar datos" }] };
  showDataSelected = false;
  items=[];

  constructor(private _requerimentService: RequerimentService) { }

  async ngOnInit(): Promise<void> {
    this.getStates()
    await this._requerimentService.getRequerimentsByStates(this.idState).then(async resp => {
      this.verticalItems = resp.body;
      this.loading = false;


      await Promise.all(this.verticalItems.map(async item=>{
        await Promise.all(item.ingSols.map(itemIng=>{
          this.formVerticalRow.addControl(`${itemIng.id}`,new FormControl(0))
        }))
        console.log(this.formVerticalRow);
      }))
    })
 
  }

  onSelectCategory(id) {
    console.log(id);
    this.showDataSelected = true;
    switch (id) {
      case 0:
      this.updateSelected.alone = true;
      this.updateSelected.multi = false;
        break;
      case 1:
        this.updateSelected.alone = false;
        this.updateSelected.multi = true;
        break;


    }
  }

  async getStates() {
    await this._requerimentService.getStates().then(resp => {
      this.states = resp.body;
      this.loading = false;
    })
  }
  onSelectedItem(item) {
    console.log(this.selectedState);
    this.selectedState = item.solicitudeId;
    console.log(item);
    console.log(this.selectedState);

  }
  onSelectedState(id) {
    console.log(id);
  }

  onOpenModal(item) {
    return `#updateState${item.id}`
  }

  onSaveNumber(item){
    item.cantidadEntregada = parseInt(this.formVerticalRow.value[`${item.id}`]);
    if (this.items.includes(item)) {
      console.log(this.items);
    }else{
      this.items.push(item);
    }

  }

  onSendData(item) {
    this.loading = true;
    if (this.updateSelected.alone) {
      console.log("Solo actualizo Estado");
      this._requerimentService.updState(item,this.selectedState).then(resp=>{
        this.loading = false;
        this.readyForUpdate.emit(true);
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })
    }else if (this.updateSelected.multi) {
      console.log("Actualizo estado y datos");
      let data={
        item:item,
        stateId:this.selectedState,
        data:this.items
      }
      this._requerimentService.updStateAndData(data).then(resp=>{
        this.loading = false;
        this.readyForUpdate.emit(true);
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })
    }
    this.updateSelected.alone = false;
    this.updateSelected.multi = true;
    this.showDataSelected = false;

  }

  onCancelForm(){
    this.updateSelected.alone = false;
    this.updateSelected.multi = true;
    this.showDataSelected = false;
  }


  test(item){
   //console.log(item);
   return `${item.id}`
  }

}
