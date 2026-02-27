import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/one/v1/auth';

  constructor(private http: HttpClient) { }

    login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: { accessToken: string }) => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
        })
      );
  }
}
