import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';

export const authGuard: CanActivateFn = () => {


  const tokenService = inject(Token);

  const router = inject(Router);


  const token = tokenService.getToken();


  if(token){

    return true;

  }


  router.navigate(['/login']);

  return false;


};
