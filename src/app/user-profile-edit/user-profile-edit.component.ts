import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {}

  editUser(): void {
    const username = this.userData.Username;
    const updatedDetails = { ...this.userData };
    delete updatedDetails.Username;

    this.fetchApiData.editUser(username, updatedDetails).subscribe({
      next: (result) => {
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('Successfully updated profile!', 'OK', { duration: 2000 });
        if (updatedDetails.Username || updatedDetails.Password) {
          localStorage.clear();
          this.router.navigate(['welcome']);
          this.snackBar.open('Please login again with your new credentials', 'OK', { duration: 2000 });
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.snackBar.open('Failed to update profile', 'OK', { duration: 2000 });
      }
    });
  }
}
