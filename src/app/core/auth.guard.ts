import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../components/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};
