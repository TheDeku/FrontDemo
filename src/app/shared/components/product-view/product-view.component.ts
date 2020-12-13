import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductService } from 'src/app/pages/admin/admin-services/product.service';

import { UserAdminService } from 'src/app/pages/admin/admin-services/user-admin.service';
import { EmpyImagePipe } from 'src/app/pipes/empyImage.pipe';
import Swal from 'sweetalert2';
import { UploadImagesService } from '../../services/upload-images.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {


  private jwtHelper = new JwtHelperService();
  data = this.jwtHelper.decodeToken(localStorage.getItem('id'));
  loading: boolean = false;
  categories: any;
  subCategories: any;
  products: any = [];
  product: any = {};
  ingredients: any;
  ingDataCat: any;
  ingData: any;
  productToDelete:any;
  showItemsByRole = { admin: { name: "ADMIN", products: true, edit: true }, cocina: { name: "COCINA", products: true, edit: false } }
  show = {
    items: {
      state: false,
      elements: {
        product: false
      }
    },
    edit: {
      state: false,
      buttons: false,
      new: false,
      text: false
    },
    categories: {
      selected: false,
      showNew: false
    }
  }

  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  formNewProduct = new FormGroup({
    nombre: new FormControl(""),
    precio: new FormControl(""),
    descripcion: new FormControl(""),
    preparacion: new FormControl(""),
  })
  formEditProduct = new FormGroup({
    nombre: new FormControl(""),
    precio: new FormControl(""),
    descripcion: new FormControl(""),
    preparacion: new FormControl(""),
  })
  formNewSubCat = new FormGroup({
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
  })
  formNewCategory = new FormGroup({
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
  })
  formDynamicIng = new FormGroup({
    cantidad: new FormControl(0),
  })
  productEditRequest={
    id: 0,
    nombre: "",
    precio: "",
    disponible: "1",
    imagen: "",
    descripcion: "",
    subcatProdId: 0,
    preparacion: "",
  }
  ingredientsDynamic = [];
  request = {
    product: {
      id: 0,
      nombre: "",
      precio: "",
      disponible: "1",
      imagen: "",
      descripcion: "",
      subcatProdId: 0,
      preparacion: "",
      type: ""
    }, recipe: {
      productoId: 0,
      ingredientes: []
    }, category: {
      nombre: "",
      descripcion: "",
      type: ""
    }, subcat: {
      nombre: "",
      descripcion: "",
      catProdId: "",
      type: ""
    }, temporal: {

    }
  }
  ingredientesRequest = {
    ingredienteId: 0,
    cantidad: 0
  }
  counterItems = 0;
  constructor(private _productService: ProductService, private imagePipe: EmpyImagePipe, private storage: AngularFireStorage,private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.getUserData();
    this.getDataInfo();
    this.getDataIng();
    this.request.product.imagen = await this.imagePipe.transform(this.request.product.imagen);
  }
  getDataIng() {
    this._productService.getCategoriesIng().then(resp => {
      this.ingDataCat = resp;
    })
  }

  async getDataInfo() {

    this.subCategories = [];
    this.products = [];
    this.loading = true;
    await this._productService.getCategories().then(resp => {
      console.log(resp);
      this.categories = resp;
      this.loading = false;
    }).catch(err=>{
      console.log(err.error.statusCode);
      this.loading = false;
      if (err.error.statusCode===401) {
        return Swal.fire({
          icon: 'warning',
          title: `Sesion expirada`,
          text: `Ah expirado la sesion`,
          showConfirmButton: true,
          allowOutsideClick: false
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            localStorage.removeItem("id");
            this.router.navigateByUrl("/signin");
          }
        })
      }
    })
  }
  onCleanForm() {
    this.categories = [];
    this.products = [];
    this.subCategories = [];
    this.getDataInfo()
    this.formEditProduct = new FormGroup({
      nombre: new FormControl(""),
      precio: new FormControl(""),
      descripcion: new FormControl(""),
      preparacion: new FormControl(""),
    })
  }

  getUserData() {
    console.log(this.data);
    for (let index = 0; index < this.data.roles.length; index++) {
      const element = this.data.roles[index];
      if (element === this.showItemsByRole.cocina.name) {
        this.show.items.state = this.showItemsByRole.cocina.products;
        this.show.edit.state = this.showItemsByRole.cocina.edit
      } else if (element === this.showItemsByRole.admin.name) {
        this.show.items.state = this.showItemsByRole.admin.products;
        this.show.edit.state = this.showItemsByRole.admin.edit
        this.show.categories.showNew = true;
      }
    }
  }

  selectedCategory(category) {

    console.log(category.subcatProds);
    this.subCategories = category.subcatProds;
    this.show.items.elements.product = false;
    this.products = [];
    this.show.edit.buttons = false;
    this.show.edit.new = false;
    this.show.edit.text = false;
    if (this.show.edit.state) {
      this.show.categories.selected = true;
      this.request.temporal['category'] = category;
      this.request.subcat.catProdId = category.id;
      console.log(this.request.temporal);
    }

  }

  async selectedSubCategory(subCategory) {

    if (this.show.edit.state) {
      this.show.edit.new = true;
      this.show.edit.text = true;
    }

    console.log(subCategory.productos);

    this.products = subCategory.productos;
    this.request.product.subcatProdId = subCategory.id;
    await Promise.all(this.products.map(async item => {
      item.imagen = await this.imagePipe.transform(item.imagen);
    }))
    console.log(this.products);
  }

  selectedProduct(product) {

    if (this.show.edit.state) {
      this.show.edit.buttons = true;
    }

    this.loading = true;
    this.product = product

    this._productService.getRecipe(product.id).then(resp => {

      this.show.items.elements.product = true;
      this.loading = false;
      console.log(resp);
      this.ingredients = resp['receta'].ingredientes;
      console.log(this.ingredients);
    })

  }

  async newCatOrSubOrProduct(type) {
    this.loading = true;
    console.log(type);
    if (type === "CAT") {
      this.request.category.nombre = this.formNewCategory.value.nombre;
      this.request.category.descripcion = this.formNewCategory.value.descripcion
      this.request.category.type = type;
      console.log(this.request.category);
      this._productService.NewCatOrSub(this.request.category).then(resp => {
        console.log(resp);
        this.loading = false;
        return Swal.fire({
          icon: 'success',
          title: 'Categoria agregada',
          text: `Se ah agregado una nueva categoria`,
          showConfirmButton: false,
          timer: 1500
        })
      })
    } else if (type === "SUBCAT") {
      this.request.subcat.nombre = this.formNewSubCat.value.nombre;
      this.request.subcat.descripcion = this.formNewSubCat.value.descripcion
      this.request.subcat.type = type;
      console.log(this.request.subcat);
      this._productService.NewCatOrSub(this.request.subcat).then(resp => {
        console.log(resp);
        this.loading = false;
        return Swal.fire({
          icon: 'success',
          title: 'Sub-Categoria agregada',
          text: `Se ah agregado una nueva sub-categoria`,
          showConfirmButton: false,
          timer: 1500
        })
      })
    } else if (type === "PROD") {

      this.request.product.nombre = this.formNewProduct.value.nombre;
      this.request.product.precio = String(this.formNewProduct.value.precio);
      this.request.product.descripcion = this.formNewProduct.value.descripcion;
      this.request.product.preparacion = this.formNewProduct.value.preparacion;
      this.request.product.type = type;
      console.log(this.request.product);
      await this._productService.NewCatOrSub(this.request.product).then(resp => {
        console.log(resp);
        this.loading = false;
        this.request.product.id = resp['id'];
        return Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: `Se ah agregado un nuevo Producto`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      this.newRecipe(this.request.product);
    }

    this.getDataInfo()

  }

  async newRecipe(request) {
    await Promise.all(this.ingredientsDynamic.map(item => {
      this.ingredientesRequest.cantidad = item.cantidad;
      this.ingredientesRequest.ingredienteId = item.info.id;
      this.request.recipe.ingredientes.push(this.ingredientesRequest)
    }))
    this.request.recipe.productoId = request.id;
    console.log(this.request.recipe);
    await this._productService.NewRecipe(this.request.recipe).then(resp => {
      console.log(resp);
    })
  }

  async selectedDataCat(data) {

    await this._productService.getIngByCat(data.id).then(resp => {
      this.ingData = resp.body;
    })

  }
  selectedDataIng(data) {
    console.log(data);
    this.counterItems++;
    this.ingredientsDynamic.push({ id: this.counterItems, showIngQuantity: true, info: data, cantidad: 0 })
    this.formDynamicIng.addControl(`${this.counterItems}`, new FormControl(0))
  }

  setIDForm(item) {
    return `${item.id}`
  }

  saveItem(item) {
    console.log(this.formDynamicIng);
    console.log(item);
    let index = this.ingredientsDynamic.indexOf(item);
    console.log(this.formDynamicIng.value[`${item.id}`]);
    this.ingredientsDynamic[index].cantidad = parseInt(this.formDynamicIng.value[`${item.id}`]);
    console.log(this.ingredientsDynamic);
  }

  deleteIngredient(item) {
    let index = this.ingredientsDynamic.indexOf(item);
    this.ingredientsDynamic.splice(index, 1);
    this.formDynamicIng.removeControl(`${item.id}`)
    console.log(this.formDynamicIng);
  }

  onEditProduct(product){
    console.log(product);
    this.productEditRequest.imagen = product.imagen;
    this.formEditProduct = new FormGroup({
      nombre: new FormControl(product.nombre),
      precio: new FormControl(product.precio),
      descripcion: new FormControl(product.descripcion),
      preparacion: new FormControl(product.preparacion),
    })
  }

  onDeleteProduct(type,product?){
    if (type==="modal") {
      this.productToDelete = product;
    }else if (type==="toDelete") {
      this.loading = true;
      this._productService.delProduct(this.productToDelete.id).then(resp=>{
        console.log(resp);
        this.loading = false;
        this.getDataInfo();
        return Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: `Se ah eliminado el producto`,
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err=>{
        this.loading = false;
        return Swal.fire({
          icon: 'warning',
          title: 'No se pudo procesar su solicitud',
          text: `El producto no pudo ser eliminado`,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }



  }


  onFileSelected(event) {

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Products/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Products/${n}`, file);
    task
      .snapshotChanges()
      .pipe(

        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.request.product.imagen = url;
            }
            console.log(this.request.product.imagen);
          });
        })

      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}









