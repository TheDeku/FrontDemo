import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
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
    costo:new FormControl(0)
  })
  states;
  selectedState;
  updateSelected = { alone: true, multi: false, category: [{ id: 0, name: "Actualizar estado" }, { id: 1, name: "Actualizar datos" }] };
  showDataSelected = false;
  items=[];
  showButtonActu=false;
  showCostsWarehouse=false;
  onlyCostAdmin=false;
  roleValidator:string;
  private jwtHelper = new JwtHelperService();

  data = this.jwtHelper.decodeToken(localStorage.getItem('id'));

  constructor(private _requerimentService: RequerimentService) { 

  }

  async ngOnInit(): Promise<void> {
    this.getStates()
    for (let index = 0; index < this.data.roles.length; index++) {
      const element = this.data.roles[index];
      //console.log(element);
      if (element!='COCINA') {
        if(element==="USUARIO"){
          this.showButtonActu = false;
        }else{
          this.roleValidator = element;
          this.showButtonActu = true;
        }
      }else if(element==="USUARIO"){
        this.showButtonActu = false;
      }
      if (element === "ADMIN") {
        this.onlyCostAdmin=true;
        this.getRequerimentByID();
      }else if(element==="BODEGA"){
        this.getRequerymentByIdAndType('cocina','bodega');
      }else if(element==="COCINA"){
        this.getRequerymentByIdAndType('cocina');
      }
    }

 
  }

  async getRequerymentByIdAndType(typeFilter?:string,typeFilter2=""){
    let filters={
      type:typeFilter,
      type2:typeFilter2
    }
    await this._requerimentService.getRequerimentsByStatesAndType({id:this.idState,filters}).then(async resp => {
      this.verticalItems = resp.body;
      this.loading = false;
      //console.log(this.verticalItems);


      await Promise.all(this.verticalItems.map(async item=>{
        if (item.tipo==="bodega") {
          this.showCostsWarehouse = true;
          item.showButtonActu = true;
        }else{
          item.showButtonActu = false;
        }

        for (let index = 0; index < this.data.roles.length; index++) {
          const element = this.data.roles[index];
          //console.log(element);
          if (element!='COCINA') {
            if(element==="USUARIO"){
              item.showButtonActu = false;
            }else if(element==="BODEGA"){
              if (item.tipo==="bodega") {
                item.showCostsWarehouse = true;
                item.showButtonActu = false;
              }else{
                item.showCostsWarehouse = false;
                item.showButtonActu = true;
              }
            }else{
             
              this.roleValidator = element;
              item.showButtonActu = true;
            }
          }else if(element==="USUARIO"){
            item.showButtonActu = false;
          }
        }
        await Promise.all(item.ingSols.map(itemIng=>{
          this.formVerticalRow.addControl(`${itemIng.id}`,new FormControl(0))
        }))
        ////console.log(this.formVerticalRow);
      }))

      //console.log(this.verticalItems);
    })
  }

  async getRequerimentByID(){
    await this._requerimentService.getRequerimentsByStates(this.idState).then(async resp => {
      this.verticalItems = resp.body;
      this.loading = false;


      await Promise.all(this.verticalItems.map(async item=>{
     
          item.showButtonActu = true;
          if (item.tipo==="bodega") {
            item.showCostsWarehouse = true;
          }

        await Promise.all(item.ingSols.map(itemIng=>{
          this.formVerticalRow.addControl(`${itemIng.id}`,new FormControl(0))
        }))
        // console.log(this.formVerticalRow);
      }))
      console.log(this.verticalItems);
    })
   
  }

  onSelectCategory(id) {
    ////console.log(id);
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
    //console.log(this.selectedState);
    this.selectedState = item.solicitudeId;
    //console.log(item);
    //console.log(this.selectedState);

  }
  onSelectedState(id) {
    //console.log(id);
  }

  onOpenModal(item) {
    return `#updateState${item.id}`
  }

  onSaveNumber(item){
    item.cantidadEntregada = parseInt(this.formVerticalRow.value[`${item.id}`]);
    if (this.items.includes(item)) {
      //console.log(this.items);
    }else{
      this.items.push(item);
    }

  }

  onSendData(item) {
    this.loading = true;
    if (this.updateSelected.alone) {
      //console.log("Solo actualizo Estado");
      this._requerimentService.updState(item,this.selectedState).then(resp=>{
        this.loading = false;
        this.readyForUpdate.emit(true);
      }).catch(err=>{
        this.loading = false;
        //console.log(err);
      })
    }else if (this.updateSelected.multi) {
      //console.log("Actualizo estado y datos");
      item.costo = this.formVerticalRow.value.costo
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
        //console.log(err);
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
   ////console.log(item);
   return `${item.id}`
  }

}
