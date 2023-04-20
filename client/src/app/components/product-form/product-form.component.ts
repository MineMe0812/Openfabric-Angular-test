import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';
 
@Component({
 selector: 'app-product-form',
 template: `
   <form class="product-form" autocomplete="off" [formGroup]="productForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
       <label for="position">Position</label>
     </div>
 
     <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">
 
       <div *ngIf="position.errors?.['required']">
         Position is required.
       </div>
       <div *ngIf="position.errors?.['minlength']">
         Position must be at least 5 characters long.
       </div>
     </div>
 
     <div class="mb-3">
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
         <label class="form-check-label" for="level-junior">Junior</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid">
         <label class="form-check-label" for="level-mid">Mid</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
           value="senior">
         <label class="form-check-label" for="level-senior">Senior</label>
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
 get position() { return this.productForm.get('position')!; }
 get level() { return this.productForm.get('level')!; }
 
 ngOnInit() {
   this.initialState.subscribe(product => {
     this.productForm = this.fb.group({
       name: [ product.name, [Validators.required] ],
       position: [ product.position, [ Validators.required, Validators.minLength(5) ] ],
       level: [ product.level, [Validators.required] ]
     });
   });
 
   this.productForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.productForm.value);
 }
}