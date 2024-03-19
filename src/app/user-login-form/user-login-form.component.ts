import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router 
  ) { }

  ngOnInit(): void {}

  loginUser(): void {
    console.log('Login credentials:', this.userData);

    this.fetchApiData.loginUser(this.userData.Username, this.userData.Password).subscribe(
      (result) => {
        this.handleLoginSuccess(result);
      },
      (error) => {
        this.handleLoginError(error);
      }
    );
  }

  private handleLoginSuccess(result: any): void {
    console.log('Login successful:', result);
    this.dialogRef.close();
    this.snackBar.open('User logged in successfully!', 'OK', { duration: 2000 });
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
    this.router.navigate(['movies']); // Navigate to movies component after successful login
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);

    let errorMessage = 'An error occurred during login. Please try again.';

    if (error.status === 401) {
      errorMessage = 'Invalid username or password.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
  }
}
