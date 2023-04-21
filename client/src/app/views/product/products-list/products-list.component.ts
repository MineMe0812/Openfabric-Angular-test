import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
 
@Component({
 selector: 'app-products-list',
 templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
 products$: Observable<Product[]> = new Observable();
 
 constructor(
    private router: Router,
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
      this.storageService.clean();
      this.router.navigate(['/login']);

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