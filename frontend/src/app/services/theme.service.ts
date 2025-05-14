import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        this.darkModeSubject.next(savedMode === 'true');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkModeSubject.next(true);
      }
    }
  }

  toggleDarkMode(): void {
    // Check if we are in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const newMode = !this.darkModeSubject.value;
      this.darkModeSubject.next(newMode);
      localStorage.setItem('darkMode', String(newMode));

      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
