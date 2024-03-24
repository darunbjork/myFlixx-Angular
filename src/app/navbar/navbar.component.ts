//src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    // Check if token is present in local storage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Redirect to Welcome page after logout
    this.router.navigate(['/welcome']); 
  }
}
