import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
 selector: 'app-root',
 template: `
   <router-outlet></router-outlet>
 `
})
export class AppComponent {
  isLoggedIn = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    const currentUrl = this.location.path();
    if (!this.isLoggedIn && (currentUrl !== '/login' && currentUrl !== '/register')) {
      this.router.navigate(['/login']);
    }
  }
}