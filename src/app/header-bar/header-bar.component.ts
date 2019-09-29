import { Component, OnInit } from '@angular/core';
import {TenantsService} from '../tenants/tenants.service';
import {TenantInterface} from '../shared/interfaces/tenant';
import {Observable} from 'rxjs/internal/Observable';

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

  constructor(private tenantsService: TenantsService) {

  }

  ngOnInit() {
    this.tenantsService.currentTenantBehaviourSubject.subscribe((currentTenant: TenantInterface) => {
      this.currentTenant = currentTenant;
    });
    this.searchTenantsSource = this.tenantsService.searchTenants('');
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
