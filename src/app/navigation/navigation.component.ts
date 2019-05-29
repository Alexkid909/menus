import { Component, OnInit } from '@angular/core';
import {NavRoute} from '../interfaces/nav-route';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navRoutes: Array<NavRoute>;
  activeRoute: NavRoute;
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.navRoutes = [
        {
            title: 'Foods',
            url: '/foods'
        },
        {
            title: 'Meals',
            url: '/meals'
        }
    ];
    this.activeRoute = this.navRoutes[0];

    this.isAuthenticated = false;
    this.authService.loggedInSubject.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  setActive(navRoute) {
    console.log(navRoute);
    this.activeRoute = navRoute;
  }

  ngOnInit() {

  }

}
