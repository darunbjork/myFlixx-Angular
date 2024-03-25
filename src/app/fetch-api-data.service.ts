//src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const apiUrl = 'https://flixster-movies-7537569b59ac.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  private userData = new BehaviorSubject<any>({});
  currentUser = this.userData.asObservable();

  private movies = new BehaviorSubject<any>({});
  moviesList = this.movies.asObservable();

  constructor(private http: HttpClient) {}
  
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  public loginUser(Username: string, Password: string): Observable<any> {
    const credentials = { Username, Password };
    // Log credentials before sending the request
    console.log('Login credentials:', credentials);
    return this.http.post<any>(`${apiUrl}login?Username=${Username}&Password=${Password}`, credentials).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Login failed: Invalid credentials');
          return throwError(() => new Error('Invalid username or password.'));
        } else {
          console.error('Login error:', error);
          return throwError(() => new Error('An error occurred during login. Please try again.'));
        }
      })
    );
  }

   // Making api call for getting the list of movies
   public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    );
    return this.http.get(apiUrl + 'movies', { headers }).pipe(
      map((response: any) => {
        console.log('Response:', response); // Log response to check if movies are being fetched
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = this.addAuthHeaders();
    return this.http.get<any>(`${apiUrl}/movies/${movieId}`, { headers }).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getDirector(director: string): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.get<any>(`${apiUrl}/${director}`, { headers }).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getGenre(genre: string): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.get<any>(`${apiUrl}/${genre}`, { headers }).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getUser(username: string): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.get<any>(`${apiUrl}/users/${username}`, { headers }).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  public getFavMovies(username: string): Observable<any> {
    return this.getUser(username).pipe(
      map((user) => user.favoriteMovies),
      catchError(this.handleError)
    );
  }

  public addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.addAuthHeaders();
    const body = { Username: username, MovieID: movieId };
    return this.http.post<any>(`${apiUrl}/users/${username}/movies/${movieId}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(username: string, updatedUserDetails: any): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.put<any>(`${apiUrl}/users/${username}`, updatedUserDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(username: string): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.delete<any>(`${apiUrl}/users/${username}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.addAuthHeaders();
    return this.http.delete<any>(`${apiUrl}/users/${username}/movies/${movieId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  // Helper function to add authorization headers
  private addAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      // Handle case when token is not available
      // For example, redirect to login page or prompt user to login
      // You can throw an error here if necessary
      console.error('Token not found in localStorage');
      return new HttpHeaders();
    }
  }
  

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${JSON.stringify(error.error)}`);
      if (error.status === 400) {
        return throwError('Bad Request: ' + JSON.stringify(error.error));
      }
    }
    return throwError('Something bad happened; please try again later.');
  }
}