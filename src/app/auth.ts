import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7081/api/auth';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'ref_token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, refreshToken: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem(this.refreshTokenKey, res.refreshToken);
            localStorage.setItem('user', email);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
  }

  getUser() {
    return localStorage.getItem('user') || '';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
