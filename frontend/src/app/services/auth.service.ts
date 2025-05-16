import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          this.currentUserSubject.next(JSON.parse(user));
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
          this.currentUserSubject.next(null);
        }
      }
    }
  }

  /**
   * Login the user and store token + user locally
   */
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<{ token: string; data: { user: User } }>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => this.handleAuthSuccess(res.token, res.data.user)),
        map((res) => res.data.user)
      );
  }

  /**
   * Register the user and store token + user locally
   */
  register(userData: any): Observable<User> {
    return this.http
      .post<{ token: string; data: { user: User } }>(`${this.apiUrl}/auth/signup`, userData)
      .pipe(
        tap((res) => this.handleAuthSuccess(res.token, res.data.user)),
        map((res) => res.data.user)
      );
  }

  /**
   * Logout the current user
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Return the current auth token from localStorage
   */
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Return the current user value
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Check if user has admin role
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  /**
   * Update stored user
   */
  updateUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

 
  /**
   * Shared logic to handle successful login/signup
   */
  private handleAuthSuccess(token: string, user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }
}
