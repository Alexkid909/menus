import { Component, OnInit } from '@angular/core';
import {NavItem} from '../interfaces/nav-item';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems: Array<NavItem>;
  activeRoute: NavItem;
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.navItems = [
        {
            title: 'Foods',
            url: '/foods',
            iconClass: 'fas fa-carrot'
        },
        {
            title: 'Meals',
            url: '/meals',
            iconClass: 'fas fa-hamburger'
        },
        {
            title: 'Tenants',
            url: '/tenants',
            iconClass: 'fas fa-home'
        },
        {
            title: 'Other',
            url: '/other',
            iconClass: 'fas fa-bars'
        }
    ];
    this.activeRoute = this.navItems[0];

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
