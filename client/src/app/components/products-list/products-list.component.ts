import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
 
@Component({
 selector: 'app-products-list',
 template: `
   <h2 class="text-center m-5">Products List</h2>

   <button class="btn btn-danger" (click)="logout()">Logout</button>
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Name</th>
               <th>Position</th>
               <th>Level</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let product of products$ | async">
               <td>{{product.name}}</td>
               <td>{{product.position}}</td>
               <td>{{product.level}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', product._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteProduct(product._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Product</button>
 `
})
export class ProductsListComponent implements OnInit {
 products$: Observable<Product[]> = new Observable();
 
 constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private storageService: StorageService
  
  ) 
  { }
 
 ngOnInit(): void {
   this.fetchProducts();
 }
 
 deleteProduct(id: string): void {
   this.productsService.deleteProduct(id).subscribe({
     next: () => this.fetchProducts()
   });
 }

 logout(): void {
  this.authService.logout().subscribe({
    next: res => {
      console.log(res);
      this.storageService.clean();
      window.location.reload();
    },
    error: err => {
      console.log(err);
    }
  });
}
 
 private fetchProducts(): void {
   this.products$ = this.productsService.getProducts();
 }
}