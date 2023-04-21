import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Sing In'} },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Product'
    },
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./views/product/products.module').then((m) => m.ProductsModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
