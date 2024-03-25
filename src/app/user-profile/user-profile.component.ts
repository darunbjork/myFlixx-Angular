import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Placeholder for user data

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (error) => {
          console.error('Failed to fetch user data', error);
          this.snackBar.open('Failed to load user profile', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('User not logged in', 'OK', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  editUserProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  deleteUserProfile(): void {
    // Implement logic to delete user profile
  }
}
