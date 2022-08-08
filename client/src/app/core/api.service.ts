import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../shared/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  login(details: Login): Observable<User> {
    // return this.http.post<User>(
    //     `${environment.serverUrl}/login`,
    //     details,
    //     { headers: { 'Content-Type': 'application/json' } }
    // );
    return this.POST<User>(`login`, details);
  }

  register(user: RegisterUser): Observable<User> {
    return this.POST<User>(`register`, user);
  }
  GET<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
    });
  }

  POST<T>(url: string, data: object): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }
}
