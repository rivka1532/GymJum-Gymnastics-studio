import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const role = cookieService.get('role');

  if (role === 'registration') {
    return true;  // גישה מאושרת
  } else {
    router.navigate(['']);  // הפנייה לדף התחברות
    return false;  // חסימה
  }
};

