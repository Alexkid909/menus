import { Component, OnInit } from '@angular/core';
import {NavRoute} from '../interfaces/nav-route';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navRoutes: Array<NavRoute>;
  activeRoute: NavRoute;

  constructor() {
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
  }

  setActive(navRoute) {
    console.log(navRoute);
    this.activeRoute = navRoute;
  }

  ngOnInit() {

  }

}
