import { Pipe, PipeTransform, inject } from '@angular/core';
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
  pure: false, // so it re-evaluates when the language changes
})
export class DateFormatPipe implements PipeTransform {
  private translate = inject(TranslateService);

  // Mapping Angular's date formats to date-fns formats
  private formatMap = {
    short: 'P', // 'short' -> 05/15/2025
    medium: 'PPP', // 'medium' -> May 15th, 2025
    long: 'PPPP', // 'long' -> Monday, May 15th, 2025
    fullDate: 'PPPP', // 'fullDate' -> Monday, May 15th, 2025
    shortDate: 'P', // 'shortDate' -> 05/15/2025
    mediumDate: 'PPP', // 'mediumDate' -> May 15th, 2025
    longDate: 'PPPP', // 'longDate' -> Monday, May 15th, 2025
    shortTime: 'p', // 'shortTime' -> 12:30 PM
    mediumTime: 'pp', // 'mediumTime' -> 12:30:45 PM
    longTime: 'pppp', // 'longTime' -> 12:30:45.123 PM
    fullTime: 'pppp', // 'fullTime' -> 12:30:45.123 PM
  };

  transform(
    value: Date | string | undefined,
    formatString: keyof typeof this.formatMap | string = 'PPpp'
  ): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;

    // Get current language from TranslateService
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang();

    // Map currentLang to date-fns locale
    const locale = currentLang === 'ar' ? ar : enUS;

    // Map the provided format string to date-fns format
    const dateFormat =
      formatString in this.formatMap
        ? this.formatMap[formatString as keyof typeof this.formatMap]
        : formatString;

    return format(date, dateFormat, { locale });
  }
}
