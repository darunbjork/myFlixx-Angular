//src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Adjust the path as necessary
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
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Assuming username is stored in local storage for this example
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (error) => {
          // Handle error (e.g., user not found or API call failure)
          console.error('Failed to fetch user data', error);
          this.snackBar.open('Failed to load user profile', 'OK', { duration: 3000 });
        }
      });
    } else {
      // Handle case where username is not available (e.g., user not logged in)
      this.snackBar.open('User not logged in', 'OK', { duration: 3000 });
      this.router.navigate(['/login']); // Redirect to login page or appropriate route
    }
  }

  editUserProfile(): void {
    // Implement logic for editing user profile
    this.router.navigate(['/edit-profile']); // Adjust route as necessary
  }

  deleteUserProfile(): void {
    // This part seems okay as is, just make sure 'username' is correctly replaced with actual username
  }
}
