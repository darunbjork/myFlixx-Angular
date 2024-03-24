// src/app/user-profile/user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Import your API service
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
    private fetchApiData: FetchApiDataService, // Inject the API service
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch user profile data when the component initializes
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    // Retrieve username from local storage
    const username = localStorage.getItem('username');
    if (username) {
      // Fetch user data from API using the username
      this.fetchApiData.getUser(username).subscribe({
        next: (userData) => {
          this.user = userData; // Assign fetched user data to the user variable
        },
        error: (error) => {
          // Handle error when user data cannot be fetched
          console.error('Failed to fetch user data', error);
          this.snackBar.open('Failed to load user profile', 'OK', { duration: 3000 });
        }
      });
    } else {
      // Redirect to login page if username is not available
      this.snackBar.open('User not logged in', 'OK', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  editUserProfile(): void {
    // Implement logic to navigate to the edit profile page
    this.router.navigate(['/edit-profile']);
  }

  deleteUserProfile(): void {
    // Implement logic to delete user profile
    // For now, leave it empty or provide a placeholder message
  }
}
