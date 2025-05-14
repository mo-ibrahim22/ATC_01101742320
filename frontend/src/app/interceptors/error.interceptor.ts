import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Skip injecting TranslateService for translation requests
  if (req.url.includes('./assets/i18n/')) {
    return next(req);
  }

  const router = inject(Router);
  const toastr = inject(ToastrService);
  const translate = inject(TranslateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error(
          translate.instant('ERRORS.UNAUTHORIZED'),
          translate.instant('ERRORS.ERROR')
        );
        router.navigate(['/login']);
      } else if (error.status === 403) {
        toastr.error(
          translate.instant('ERRORS.FORBIDDEN'),
          translate.instant('ERRORS.ERROR')
        );
        router.navigate(['/']);
      } else if (error.status === 404) {
        router.navigate(['/not-found']);
      } else if (error.status >= 500) {
        toastr.error(
          translate.instant('ERRORS.SERVER_ERROR'),
          translate.instant('ERRORS.ERROR')
        );
      }

      return throwError(() => error);
    })
  );
}
