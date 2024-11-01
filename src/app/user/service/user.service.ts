import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserEntity} from '../model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = `${environment.serverBasePath}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.basePath).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.basePath, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: UserEntity): Observable<UserEntity> {
    return this.http.put<UserEntity>(`${this.basePath}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
