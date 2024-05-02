import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthentificationService).isAuthenticated()
  ? true
  : inject(Router).createUrlTree(['/login'])
};
