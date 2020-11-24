import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RequerimentService } from '../../services/requeriment.service';


@Component({
  selector: 'app-horizonal-column',
  templateUrl: './horizonal-column.component.html',
  styleUrls: ['./horizonal-column.component.css']
})
export class HorizonalColumnComponent implements OnInit {

  private jwtHelper = new JwtHelperService();

  data =this.jwtHelper.decodeToken(localStorage.getItem('id'));
  loading:boolean=true;
  horizontalItems:any=[];
  dataToSelect;
  categoryIngredients;
  formHorizonalRow = new FormGroup({
    item: new FormControl(0),
  })
  ingredients;
  items=[];
  counterItems=0;
  showItems=false;
  constructor(private _requerimentService:RequerimentService) { }

  async ngOnInit(): Promise<void> {
  
    this.getData();
    this.getUserData()
  }
  getUserData() {
    console.log(this.data);
    for (let index = 0; index < this.data.roles.length; index++) {
      const element = this.data.roles[index];
      if (element==="COCINA") {
        this.dataToSelect = [{item:"Solicitud de ingredientes",type:'cocina'}]
      }else if (element==="BODEGA") {
        this.dataToSelect = [{item:"Solicitud de compra",type:'bodega'}]
      }else if (element==="ADMIN") {
        this.dataToSelect = [{item:"Solicitud de ingredientes",type:'cocina'},{item:"Solicitud de compra",type:'bodega'}]
      }
    }
  }

  async getData(){
    await this._requerimentService.getStates().then(resp=>{
      // console.log(resp.body);
       this.horizontalItems = resp.body;
       this.loading = false;
     })

    //  await this._requerimentService.getCategories().then(resp=>{
    //    console.log(resp);
    //    this.categoryIngredients = resp;
    //  })
  }
  output(doS){
    // console.log(doS);
    if (doS) {
      this.getData();
    }
  }

  async getCategoryData(){
    let categories;
    await this._requerimentService.getCategories().then(resp=>{
    
    categories = resp;
    })
    return categories;
  }

  showItem(){
    this.showItems = true;
  }

  async newItem(){
    this.counterItems++;
    let categories;
    await this.getCategoryData().then(resp=>{
      categories = resp;
    });
    console.log(categories);
    this.items.push({id:this.counterItems,showInfo:true,showIngredients:false,showform:false,item:{},categoryData:categories,ingredients:[]})
    this.formHorizonalRow.addControl(`${this.counterItems}`,new FormControl(0))
  }

  async findIngredients(item,catId){
    console.log(item);
    if (this.items.includes(item)) {
      let index = this.items.indexOf(item);
      await this.findIngredientsBycat(catId).then(resp=>{
        this.items[index].ingredients=resp;
      })
      this.items[index].showIngredients=true;
    }
    console.log(this.items);
  }

  async selectIngredient(item,ingId){
    console.log(item);
    let index = this.items.indexOf(item);
    this.items[index].showform=true;
  
  }

  setIDForm(item){
    return `${item.id}`
  }

  saveItem(item){
    console.log(this.formHorizonalRow);
  }

  deleteItem(item){
    let index = this.items.indexOf(item);
    this.items.splice(index,1);
  }

  //ingredients
  async findIngredientsBycat(id){
    let response;
    await this._requerimentService.getIngByCat(id).then(resp=>{
      response = resp.body;
    })

    return response;
  }
}
