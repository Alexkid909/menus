import {Component, OnInit, ViewChild} from '@angular/core';
import {TenantsService} from '../../../tenants/tenants.service';
import { TenantInterface } from '../../interfaces/tenant.interface';

import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from '../../../auth/auth.service';
import {SearchComponent} from '../search/search.component';

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
  searchTenantsSource: Observable<Array<TenantInterface>>;
  isAuthed: boolean;
  searchActiveState = false;
  @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(private tenantsService: TenantsService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedInSubject.subscribe((state: boolean) => {
      this.isAuthed = state;
      this.searchTenantsSource = state ? this.tenantsService.searchTenants('') : undefined;
    });

    this.tenantsService.currentTenantBehaviourSubject.subscribe((currentTenant: TenantInterface) => {
      this.currentTenant = currentTenant;
    });

    this.tenantsService.tenantsBehaviorSubject.subscribe((tenants: Array<TenantInterface>) => {
      this.tenants = tenants;
    });
  }

  setSearchActiveState(newState: boolean) {
    this.searchActiveState = newState;
  }

  activateSearch() {
    if (!this.searchActiveState) {
      this.setSearchActiveState(true);
    }
  }

  deactivateSearch() {
    if (this.searchActiveState) {
      this.setSearchActiveState(false);
    }
  }

  handleSearchTransform(event: TransitionEvent) {
    if (event.propertyName === 'transform') {
      if (event.type === 'transitionend' && this.searchActiveState) {
        this.searchComponent.setActive(true);
      }

      if (event.type === 'transitionstart' && !this.searchActiveState) {
        this.searchComponent.setActive(false);
      }
    }
  }

  setCurrentTenant(tenant: TenantInterface) {
    this.setSearchActiveState(false);
    this.currentTenant = tenant;
    this.tenantsService.setCurrentTenant(tenant._id);
  }

  searchTenants(event) {
    this.searchTenantsSource = this.tenantsService.searchTenants(event);
  }

}
