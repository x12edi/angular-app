import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUser() {
    return localStorage.getItem('user') || '';
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('user');
  }
}
