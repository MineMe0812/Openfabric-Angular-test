import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
 
@Component({
 selector: 'app-edit-product.component.ts',
 template: `
   <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header pb-0">
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                <h6 class="mb-0">Edit Product</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
              <app-product-form [initialState]="product" (formSubmitted)="editProduct($event)"></app-product-form>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
   
 `
})
export class EditProductComponent implements OnInit {
 product: BehaviorSubject<Product> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private productService: ProductService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.productService.getProduct(id !).subscribe((product) => {
     this.product.next(product);
   });
 }
 
 editProduct(product: Product) {
   this.productService.updateProduct(this.product.value._id || '', product)
     .subscribe({
       next: () => {
         this.router.navigate(['/products']);
       },
       error: (error) => {
         alert('Failed to update product');
         console.error(error);
       }
     })
 }
}