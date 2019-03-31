import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface JSONData {
  total: number;
  data: UserData;
}

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dropDownURL = 'https://reqres.in/api/users';
   //dataURL = 'https://jsonplaceholder.typicode.com/comments';
   dataURL = 'https://jsonplaceholder.typicode.com/comments';
  constructor(private http: HttpClient) { }
  firstClick() {
    return console.log('clicked');
  } 
  getUsers() {
    //return this.http.get('https://jsonplaceholder.typicode.com/users')
    return this.http.get<JSONData>(this.dropDownURL);
    
    //
  }

  getData() {
    return this.http.get(this.dataURL).pipe( retry(3), 
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
