import {CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()


export class UnauthGuard implements CanActivate {

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
    if (this.isAuthenticated === false) {
      return true;
    }
    this.router.navigate(['/tenants']);
    return false;
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (this.authService.loggedIn()) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }
  //
  // canLoad(route: Route): boolean {
  //   if (this.authService.loggedIn()) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }


}
