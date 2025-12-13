import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PagedResult<T> {
  users: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:7081/api/user/'; // Change to your backend

  constructor(private http: HttpClient) { }

  getUsers(page: number, pageSize: number, search: string, sortBy: string, sortOrder: 'asc' | 'desc'): Observable<PagedResult<User>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('searchFilter', search)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<PagedResult<User>>(this.apiUrl + 'list', { params });
  }

  // Add new user
  addUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'add', userData);
  }

  // Update existing user
  updateUser(userData: User): Observable<User> {
    if (!userData.id) throw new Error('User ID is required for update');
    //return this.http.put<User>(`${this.apiUrl}update/${userData.id}`, userData);
    return this.http.put<User>(`${this.apiUrl}update/`, userData);
  }

}
