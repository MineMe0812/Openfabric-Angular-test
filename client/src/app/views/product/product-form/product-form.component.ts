import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../models/product.model';
 
@Component({
 selector: 'app-product-form',
 template: `
    <form class="product-form" autocomplete="off" [formGroup]="productForm" (ngSubmit)="submitForm()">
     <div class="mb-3">
        <label for="name">Name</label>
        <input 
          class="form-control" 
          type="text" id="name" 
          formControlName="name" 
          placeholder="Name" 
          [ngClass]="{ 'is-invalid': name.invalid && (name.dirty || name.touched) }"
          required>
          <div *ngIf="name.invalid && (name.dirty || name.touched)" class="invalid-feedback">
            <div *ngIf="name.errors?.['required']">
              Name is required.
            </div>
            <div *ngIf="name.errors?.['minlength']">
              Name must be at least 3 characters long.
            </div>
          </div>
       
     </div>
 
     <div class="mb-3">
        <label for="price">Price</label>
        <input 
          class="form-control" 
          type="number" 
          formControlName="price" 
          placeholder="Price"
          [ngClass]="{ 'is-invalid': price.invalid && (price.dirty || price.touched) }"
          required>
        <div *ngIf="price.invalid && (price.dirty || price.touched)" class="invalid-feedback">
          <div *ngIf="price.errors?.['required']">
            Price is required.
          </div>
          <div *ngIf="price.errors?.['maxlength']">
            Price must be at most 5 digits.
          </div>
        </div>
     </div>

     <div class="mb-3">
        <label for="description">Description</label>
        <textarea 
          class="form-control" 
          formControlName="description" 
          placeholder="Description"
          rows="5"
          [ngClass]="{ 'is-invalid': description.invalid && (description.dirty || description.touched) }"
          required
          >
        </textarea>

        <div *ngIf="description.invalid && (description.dirty || description.touched)" class="invalid-feedback">
          <div *ngIf="description.errors?.['required']">
            Description is required.
          </div>
          <div *ngIf="description.errors?.['maxlength']">
            Description must be at least 255 characters.
          </div>
        </div>
     </div>

     <div class="mb-3">
       <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" formControlName="size" name="size" id="size-M" value="M" required>
         <label class="form-check-label" for="size-M">M</label>
       </div>
       <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" formControlName="size" name="size" id="size-L" value="L">
         <label class="form-check-label" for="size-L">L</label>
       </div>
       <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" formControlName="size" name="size" id="size-XL"
           value="XL">
         <label class="form-check-label" for="size-XL">XL</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="productForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.product-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class ProductFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Product> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Product>();
 
 @Output()
 formSubmitted = new EventEmitter<Product>();
 
 productForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.productForm.get('name')!; }
 get price() { return this.productForm.get('price')!; }
 get description() { return this.productForm.get('description')!; }
 get size() { return this.productForm.get('size')!; }
 
 ngOnInit() {
   this.initialState.subscribe(product => {
     this.productForm = this.fb.group({
       name: [ product.name, [Validators.required] ],
       price: [ product.price, [ Validators.required, Validators.maxLength(5) ] ],
       description: [ product.description, [Validators.required, Validators.maxLength(255)] ],
       size: [ product.size, [Validators.required] ]
     });
   });
 
   this.productForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.productForm.value);
 }
}