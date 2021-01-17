import {Component, OnInit} from '@angular/core';
import {TenantsService} from '../../../tenants/tenants.service';
import { TenantInterface } from '../../interfaces/tenant.interface';
import {SideBarService} from '../../side-bar.service';
import {MainMenuComponent} from '../../main-menu/main-menu.component';
import {AuthService} from '../../../auth/auth.service';

interface TransitionEvent extends Event {
  propertyName: string;
}

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {


  tenants: Array<TenantInterface>;
  currentTenant: TenantInterface;
  isAuthed: boolean;

  constructor(private tenantsService: TenantsService,
              private authService: AuthService,
              private sideBarService: SideBarService) {}

  ngOnInit() {
    this.tenantsService.currentTenantBehaviourSubject.subscribe((currentTenant: TenantInterface) => {
      this.currentTenant = currentTenant;
    });

    this.authService.loggedInSubject.subscribe((state: boolean) => {
      this.isAuthed = state;
    });
  }

  showMainMenu() {
    const sideBarConfig = {
      data: {
        // title: `Main Menu`,
      }
    };
    this.sideBarService.showSideBar(MainMenuComponent, sideBarConfig);
  }

  hideMainMenu() {
    this.sideBarService.closeSideBar();
  }
}
