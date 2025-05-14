import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('language') || 'en';
      this.translate.setDefaultLang('en');
      this.translate.use(savedLang);

      // Ensure DOM is available before accessing document properties
      if (typeof document !== 'undefined') {
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }

  switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(lang);
      localStorage.setItem('language', lang);

      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }
}
