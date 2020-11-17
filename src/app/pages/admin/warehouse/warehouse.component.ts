import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserAdminService } from '../admin-services/user-admin.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  categories:any;
  units;
  ingredients:any;
  selectedUnit;
  selectedCategory;
  ingredtientQuantity:number;
  formWarehouse = new FormGroup({
    categoryName: new FormControl("", [Validators.required]),
    categoryDescrip: new FormControl("", [Validators.required]),
    unitName: new FormControl("", [Validators.required]),
    unitDescrip: new FormControl("", [Validators.required]),
    imgName: new FormControl("", [Validators.required]),
    imgQuantity: new FormControl("", [Validators.required]),
    imgImage: new FormControl("", [Validators.required]),
    imgDesc: new FormControl("", [Validators.required]),
    imgVol: new FormControl("", [Validators.required]),
    imgDetMarca: new FormControl("", [Validators.required]),
    imgDetQuantity: new FormControl("", [Validators.required]),
    imgDetFormat: new FormControl("", [Validators.required]),
    imgBarcode: new FormControl("", [Validators.required]),
  })
  options = [
    { name: "Categoria", type: "CAT" },
    { name: "Ingrediente", type: "ING" },
    { name: "Unidad de medida", type: "MED" },
  ]
  typeOpt = { category: { value: "", active: false }, ingredient: { value: "", active: false }, unit: { value: "", active: false }, selected: "" }
  tempValues ={
      idCat:0,
      idUnit:0,
      idIng:0,
      idDet:0
  }

  ingredientToDelete = 0;
  constructor(private _userAdmService: UserAdminService) { }




  async ngOnInit(): Promise<void> {
    this.mappingComboBoxs();
   
  }

  oncleanForm() {
    this.typeOpt.category.active = false;
    this.typeOpt.ingredient.active = false;
    this.typeOpt.unit.active = false;
    this.formWarehouse = new FormGroup({
      categoryName: new FormControl("", [Validators.required]),
      categoryDescrip: new FormControl("", [Validators.required]),
      unitName: new FormControl("", [Validators.required]),
      unitDescrip: new FormControl("", [Validators.required]),
      imgName: new FormControl("", [Validators.required]),
      imgQuantity: new FormControl("", [Validators.required]),
      imgDesc: new FormControl("", [Validators.required]),
      imgVol: new FormControl("", [Validators.required]),
      imgDetMarca: new FormControl("", [Validators.required]),
      imgDetQuantity: new FormControl("", [Validators.required]),
      imgDetFormat: new FormControl("", [Validators.required]),
      imgBarcode: new FormControl("", [Validators.required]),
    })
  }

  onSelectedResource(type) {
    if (type === 'CAT') {
      this.typeOpt.category.active = true;
      this.typeOpt.ingredient.active = false;
      this.typeOpt.unit.active = false;
    } else if (type === 'ING') {
      this.typeOpt.category.active = false;
      this.typeOpt.ingredient.active = true;
      this.typeOpt.unit.active = false;
    } else if (type === 'MED') {
      this.typeOpt.category.active = false;
      this.typeOpt.ingredient.active = false;
      this.typeOpt.unit.active = true;
    }
    this.typeOpt.selected = type;
  }
  onSelectedCategory(value) {
    this.tempValues.idCat = value;
  }
  onSelectedUnit(value) {
    this.tempValues.idUnit = value;
  }

  async searchByCategory(id) {
    await this._userAdmService.getIngByCat(id).then(resp => {
      this.ingredients = resp.body;
    }).catch(err => { });
    this.ingredtientQuantity = this.ingredients.length;
  }


  async onCreateResource() {
    this.formWarehouse.value.selected = this.typeOpt.selected;
    this.formWarehouse.value.idCat = this.tempValues.idCat;
    this.formWarehouse.value.idUnit = this.tempValues.idUnit;
    await this._userAdmService.createResource(this.formWarehouse.value).then(resp => {
      if (resp.status===201){
        if (this.typeOpt.selected === 'MED') {
          resp.body.nombre = resp.body.sufix;
        }
        this.oncleanForm();
        return Swal.fire({
          icon: 'success',
          title: 'Se ah generado un nuevo recurso',
          text: ` Creado recurso ${resp.body.nombre} correctamente`
        });
      }else{
        this.oncleanForm();
        return Swal.fire({
          icon: 'error',
          title: 'No se logro crear el recurso',
          text: `Intente nuevamente.`
        });
      }
    
      
    }).catch(err => { })

    this.mappingComboBoxs();
  }

  async onDeleteResource(){
    await this._userAdmService.deleteIng(this.ingredientToDelete).then(resp=>{
      console.log(resp);
      if (resp.ok) {
        return Swal.fire({
          icon: 'success',
          title: 'Ingrediente Eliminado',
          text: ` Ingrediente eliminado correctamente`
        });
      }else{
        this.oncleanForm();
        return Swal.fire({
          icon: 'error',
          title: 'No se pudo eliminar el ingrediente',
          text: `Intente nuevamente.`
        });
      }
    }).catch(err =>{
      console.log(err);
      return Swal.fire({
        icon: 'error',
        title: 'No se pudo eliminar el ingrediente',
        text: `Intente nuevamente.`
      });
    });
    this.mappingComboBoxs();
  }
  prepareDelete(id){
    this.ingredientToDelete = id;
  }

  async onUpateResource(){
    this.formWarehouse.value.selected = this.typeOpt.selected;
    this.formWarehouse.value.idCat = this.tempValues.idCat;
    this.formWarehouse.value.idUnit = this.tempValues.idUnit;
    this.formWarehouse.value.id = this.tempValues.idIng;
    this.formWarehouse.value.idDet = this.tempValues.idDet;
    await this._userAdmService.updateIng(this.formWarehouse.value).then(resp => {
      if (resp.ok) {
        return Swal.fire({
          icon: 'success',
          title: 'Ingrediente Actualizado',
          text: ` Ingrediente actualizado correctamente`
        });
      }else{
        this.oncleanForm();
        this.mappingComboBoxs();
        return Swal.fire({
          icon: 'error',
          title: 'No se pudo actualizar',
          text: `Intente nuevamente.`
        });
      }
    }).catch(err => { })
  }


  onFullForm(values) {
    let detail = values.ingredienteDetalles[0];
    console.log(values);
    if (detail===undefined) {
      detail={
        marca : "",
        cantidad: "",
        formato : "",
        barcode: ""
      }
    }
    this.formWarehouse = new FormGroup({
      categoryName: new FormControl("", [Validators.required]),
      categoryDescrip: new FormControl("", [Validators.required]),
      unitName: new FormControl("", [Validators.required]),
      unitDescrip: new FormControl("", [Validators.required]),
      imgName: new FormControl(values.nombre, [Validators.required]),
      imgQuantity: new FormControl(values.cantidadTotal, [Validators.required]),
      imgDesc: new FormControl(values.descripcion, [Validators.required]),
      imgVol: new FormControl(values.volumenTotal, [Validators.required]),
      imgDetMarca: new FormControl(detail.marca, [Validators.required]),
      imgDetQuantity: new FormControl(detail.cantidad, [Validators.required]),
      imgDetFormat: new FormControl(detail.formato, [Validators.required]),
      imgBarcode: new FormControl(detail.barcode, [Validators.required]),
    })
    this.selectedCategory = values.catIng.nombre;
    this.onSelectedCategory(values.catIng.id);
    this.selectedUnit = values.unidad.descripcion;
    this.onSelectedUnit(values.unidad.id)
    this.tempValues.idIng = values.id;
    this.tempValues.idDet = detail.id
    this.typeOpt.selected = 'ING';
    console.log(this.formWarehouse.value);
 
  }

  async mappingComboBoxs() {
    await this._userAdmService.getCategories().then(resp => {
      this.categories = resp;
    })
    await this._userAdmService.getUnits().then(resp => {
      this.units = resp;
    })
    await this._userAdmService.getingredients().then(resp => {
      this.ingredients = resp;
    })
    this.ingredtientQuantity = this.ingredients.length;
  }

}
