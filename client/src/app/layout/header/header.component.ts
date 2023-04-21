


import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentUser: any;
  
 constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService

  ) 
  { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
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

}