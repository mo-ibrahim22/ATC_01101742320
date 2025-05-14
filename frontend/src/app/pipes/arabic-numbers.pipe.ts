import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'arabicNumbers',
  standalone: true,
  pure: false
})
export class ArabicNumbersPipe implements PipeTransform {
  private translate = inject(TranslateService);

  private convertToArabicNumbers(value: string): string {
    return value.replace(/[0-9]/g, (match) => {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return arabicDigits[parseInt(match, 10)];
    });
  }

  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '';

    const strValue = value.toString();  // convert number to string

    const currentLang = this.translate.currentLang || this.translate.getDefaultLang();

    if (currentLang === 'ar') {
      return this.convertToArabicNumbers(strValue);
    }

    return strValue;
  }
}
