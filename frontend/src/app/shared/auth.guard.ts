import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route) => {
  
  const authService = inject(AuthentificationService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  if(!authService.isAuthenticated()){
    return router.createUrlTree(['/login']);
  }


  if (requiredRoles) {
    const userRole = authService.getRole();
    console.log("UserRole:", userRole);

    if (!requiredRoles.includes(userRole)) {
      return router.createUrlTree(['/unauthorized-page']);
    }
  }
  // Si toutes les vérifications passent, permettre l'accès à la route
  return true;
}; 