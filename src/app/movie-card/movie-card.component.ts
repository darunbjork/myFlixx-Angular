import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog // Inject MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
        this.snackBar.open('Something went wrong. Please try again later.', 'OK', { duration: 3000 });
      }
    );
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
    });
}


openDirectorDialog(name: string, bio: string, birth: string, death?: string): void {
  this.dialog.open(DirectorDialogComponent, {
    data: { name, bio, birth, death },
  });
}


openSynopsisDialog(synopsis: string): void {
  this.dialog.open(SynopsisDialogComponent, {
    data: { synopsis }
  });
}

}
