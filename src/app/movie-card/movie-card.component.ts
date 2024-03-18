//src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  loggedIn: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loggedIn = !!localStorage.getItem('token');
    if (this.loggedIn) {
      this.getMovies();
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
        if (error.status === 401) {
          this.snackBar.open('You are not authorized. Please log in again.', 'OK', { duration: 3000 });
          // Optionally, you can redirect the user to the login page
          // this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Something went wrong. Please try again later.', 'OK', { duration: 3000 });
        }
      }
    );
  }
}
