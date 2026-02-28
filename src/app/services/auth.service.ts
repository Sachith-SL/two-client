import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/one/v1/auth';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap((response: { accessToken: string }) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }
        }),
      );
  }

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  refreshToken(): Observable<any> {
    // The backend should read the refresh token from HttpOnly cookie
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap((response: { accessToken: string }) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }
        }),
      );
  }

  logout() {
    this.accessToken = null;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
  
}
