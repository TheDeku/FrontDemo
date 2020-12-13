import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin-services/product.service';
import { EmpyImagePipe } from '../../../pipes/empyImage.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  loading:boolean=false;
  categories:any;
  subCategories:any;
  products:any = [];
  product:any={};
  ingredients:any;
  constructor(private _productService:ProductService, private imagePipe:EmpyImagePipe) { }

  ngOnInit(): void {
    this.loading = true;
    this._productService.getCategories().then(resp=>{
      console.log(resp);
      this.categories = resp;
      this.loading = false;
    })
  }

  selectedCategory(category){
    console.log(category.subcatProds);
    this.subCategories = category.subcatProds;
  }

  async selectedSubCategory(subCategory){
    console.log(subCategory.productos);

    this.products = subCategory.productos;

    await Promise.all(this.products.map(async item=>{
      item.imagen = await this.imagePipe.transform(item.imagen);
    }))
    console.log(this.products);
  }

  selectedProduct(product){
    this.loading = true;
    this.product = product
    this._productService.getRecipe(product.id).then(resp=>{
      this.loading = false;
      console.log(resp);
      this.ingredients = resp['receta'].ingredientes;
      console.log(this.ingredients);
    })

  }

}
