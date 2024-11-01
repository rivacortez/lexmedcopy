import { Injectable } from '@angular/core';
import {RequestServiceEntity} from "../model/request-service.entity";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {BaseService} from '../../shared/services/base.service';
import {StatusEntity} from '../model/status.entity';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends BaseService<RequestServiceEntity> {
  constructor(http: HttpClient, private notificationService: NotificationService) {
    super();
    this.http = http;
    this.resourceEndpoint = '/requests';
  }

  createRequest(request: RequestServiceEntity): Observable<RequestServiceEntity> {
    return this.http.post<RequestServiceEntity>(this.resourcePath(), request, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Request Created',
        `A new request has been created.`,
        'success',
        'path/to/success-image.jpg'
      )),
      catchError(this.handleError)
    );
  }

  updateRequest(request: RequestServiceEntity): Observable<RequestServiceEntity> {
    const url = `${this.basePath}/requests/${request.id}`;
    return this.http.put<RequestServiceEntity>(url, request, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Request Updated',
        `The request with ID ${request.id} has been updated.`,
        'success',
        'path/to/success-image.jpg'
      )),
      catchError(this.handleError)
    );
  }

  override getAll(): Observable<RequestServiceEntity[]> {
    return this.http.get<RequestServiceEntity[]>(this.resourcePath(), this.httOptions).pipe(
      catchError(this.handleError)
    );
  }

  getStatuses(): Observable<StatusEntity[]> {
    return this.http.get<StatusEntity[]>(`${environment.serverBasePath}/statuses`).pipe(
      catchError(this.handleError)
    );
  }

  protected override handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
      if (error.status === 200 && typeof error.error === 'string') {
        errorMessage = `Unexpected response format: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
