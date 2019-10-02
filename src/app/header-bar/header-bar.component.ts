import { Component, OnInit } from '@angular/core';
import {TenantsService} from '../tenants/tenants.service';
import {TenantInterface} from '../shared/interfaces/tenant';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  tenants: Array<TenantInterface>;
  currentTenant: TenantInterface;
  searchTenantsSource: Observable<Array<TenantInterface>>;
  searchTerm: string;
  isAuthed: boolean;

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

  setCurrentTenant(tenant: TenantInterface) {
    this.currentTenant = tenant;
    this.tenantsService.setCurrentTenant(tenant._id);
  }

  searchTenants(event) {
    this.searchTenantsSource = this.tenantsService.searchTenants(event);
  }

}
