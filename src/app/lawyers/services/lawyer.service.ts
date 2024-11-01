import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lawyer } from '../model/lawyer.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {
  private apiUrl = `${environment.serverBasePath}/lawyers`;

  constructor(private http: HttpClient) {}

  getLawyers(): Observable<Lawyer[]> {
    return this.http.get<Lawyer[]>(this.apiUrl);
  }

  getLawyer(id: number): Observable<Lawyer> {
    return this.http.get<Lawyer>(`${this.apiUrl}/${id}`);
  }

  updateLawyer(lawyer: Lawyer): Observable<Lawyer> {
    return this.http.put<Lawyer>(`${this.apiUrl}/${lawyer.id}`, lawyer);
  }
}
