import {CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()


export class AuthGuard implements CanActivate {

  isAuthenticated: boolean;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated = false;
    this.authService.loggedInSubject.subscribe((success: any) => {
      this.isAuthenticated = success;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated === true) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
