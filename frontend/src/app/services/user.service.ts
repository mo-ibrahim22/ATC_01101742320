import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Admin: Get all users.
   */
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<any>(`${this.apiUrl}/users`)
      .pipe(map((res) => res.data.users));
  }

  /**
   * Admin: Get single user by ID.
   */
  getUser(id: string): Observable<User> {
    return this.http
      .get<any>(`${this.apiUrl}/users/${id}`)
      .pipe(map((res) => res.data.user));
  }

  /**
   * Admin: Update a user's data.
   */
  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http
      .patch<any>(`${this.apiUrl}/users/${id}`, userData)
      .pipe(map((res) => res.data.user));
  }

  /**
   * Admin: Delete a user.
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * User: Update their own profile info.
   */
  updateMe(userData: FormData): Observable<User> {
    return this.http
      .patch<any>(`${this.apiUrl}/users/updateMe`, userData)
      .pipe(map((res) => res.data.user));
  }

  /**
   * User: Delete their own account.
   */
  deleteMe(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/deleteMe`);
  }

  /**
   * User: Update their password.
   */
  updatePassword(
    currentPassword: string,
    newPassword: string,
    passwordConfirm: string
  ): Observable<User> {
    return this.http
      .patch<any>(`${this.apiUrl}/auth/updateMyPassword`, {
        currentPassword,
        newPassword,
        passwordConfirm,
      })
      .pipe(map((res) => res.data.user));
  }

  /**
   * User: Upload their profile photo.
   */
  uploadProfilePhoto(photo: File): Observable<{ photoUrl: string }> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.patch<any>(`${this.apiUrl}/users/me/photo`, formData).pipe(
      map((res) => ({
        photoUrl: res.data.photo,
      }))
    );
  }
}
