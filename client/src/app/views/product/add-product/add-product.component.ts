import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
 
@Component({
 selector: 'app-add-product',
 template: `
  <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header pb-0">
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                <h6 class="mb-0">Add Product</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <app-product-form (formSubmitted)="addProduct($event)"></app-product-form>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
 `
})
export class AddProductComponent {
 constructor(
   private router: Router,
   private productService: ProductService
 ) { }
 
 addProduct(product: Product) {
   this.productService.createProduct(product)
     .subscribe({
       next: () => {
         this.router.navigate(['/products']);
       },
       error: (error) => {
         alert("Failed to create product");
         console.error(error);
       }
     });
 }
}