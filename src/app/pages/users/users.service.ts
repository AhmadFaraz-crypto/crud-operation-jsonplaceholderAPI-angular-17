import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

// types
import type { User, UserBody } from '../../types/users';

@Injectable()
export class UsersService {
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`);
  }

  createUser(payload: UserBody): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, payload);
  }

  updateUser(id: number, payload: UserBody): Observable<User> {
    return this.http.patch<User>(`${this.usersUrl}/${id}`, payload);
  }
}
