// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public FetchApiDataService: FetchApiDataService, 
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  registerUser(): void {
    this.FetchApiDataService.userRegistration(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User registered successfully!', 'OK', { duration: 2000 });
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      },
      (response) => {
        this.snackBar.open(response, 'OK', { duration: 2000 });
      }
    );
  }
}
