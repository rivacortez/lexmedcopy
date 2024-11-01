import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserApiService  {
  private apiUrl = 'http://localhost:3000/users'; // URL del json-server

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  register(name: string, specialization: string, email: string, password: string) {
    const user = new User(name, specialization, email, password);

    return this.http.post(this.apiUrl, user);
  }
}
