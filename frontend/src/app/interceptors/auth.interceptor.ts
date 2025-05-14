import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  let authToken: string | null = null;

  // Safe platform check: ensure window is defined (no SSR)
  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('token');
  }

  // Clone and set Authorization header only if token exists
  const newReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      })
    : req;


  return next(newReq);
}
