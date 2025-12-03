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
  private apiUrl = 'https://localhost:7081/api/user/list'; // Change to your backend

  constructor(private http: HttpClient) { }

  getUsers(page: number, pageSize: number, search: string): Observable<PagedResult<User>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('emailFilter', search);

    return this.http.get<PagedResult<User>>(this.apiUrl, { params });
  }
}
