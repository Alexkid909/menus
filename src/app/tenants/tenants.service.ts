import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TenantClass } from './classes/tenant.interface';
import { TenantInterface } from '../shared/interfaces/tenant.interface';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class TenantsService {

  api = 'https://localhost:8443';
  currentTenantID: string = null;
  currentTenantIDBehaviourSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  currentTenant: TenantInterface;
  currentTenantBehaviourSubject: BehaviorSubject<TenantInterface> = new BehaviorSubject(null);
  tenants: Array<TenantInterface> = [];
  tenantsBehaviorSubject: BehaviorSubject<Array<TenantInterface>> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.loggedInSubject.subscribe((state: boolean) => {
      if (state) {
        combineLatest([this.currentTenantIDBehaviourSubject, this.tenantsBehaviorSubject]).subscribe(() => {
          if (this.currentTenantID && this.tenants.length) {
            this.getCurrentTenant();
            this.broadcastCurrentTenant();
          }
        });
        this.getCurrentTenantID();
        this.getUserTenants();
        this.broadcastUserTenants();
        this.broadcastCurrentTenantID();
      }
    });
  }

  private getCurrentTenantID() {
    if (!this.currentTenantID) {
      this.currentTenantID = localStorage.getItem('currentTenantID');
    }
    return this.currentTenantID;
  }

  setCurrentTenant(tenantID: string) {
    this.currentTenantID = tenantID;
    localStorage.setItem('currentTenantID', this.currentTenantID);
    this.broadcastCurrentTenantID();
  }

  private getCurrentTenant() {
    this.currentTenant = this.tenants.find((tenant: TenantInterface) => tenant._id === this.currentTenantID);
  }

  private broadcastCurrentTenantID() {
    this.currentTenantIDBehaviourSubject.next(this.currentTenantID);
  }

  public broadcastCurrentTenant() {
    this.currentTenantBehaviourSubject.next(this.currentTenant);
  }

  public broadcastUserTenants() {
    this.tenantsBehaviorSubject.next(this.tenants);
  }

  public searchTenants(term: string): Observable<Array<TenantInterface>> {
    return this.http.get(`${this.api}/user/tenants`).pipe(map((results: any) => {
      const searchResults = !term ? [] : results.data.filter((result: TenantInterface) => {
        return result.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      });
      return searchResults;
    }));
  }

  private getUserTenants() {
    this.http.get(`${this.api}/user/tenants`).subscribe((response: any) => {
      this.tenants = response.data;
      this.broadcastUserTenants();
    });
  }

  public createTenant(tenant: TenantClass) {
    return this.http.post(`${this.api}/tenants`, {name: tenant.name}).pipe(map(() => {
      this.getUserTenants();
    }));
  }

  public updateTenant(tenantId: string, tenant: TenantClass) {
    return this.http.put(`${this.api}/tenants/${tenantId}`, {name: tenant.name}).pipe(map(() => {
      this.getUserTenants();
    }));
  }

  public deleteTenant(tenantId: string) {
    return this.http.delete(`${this.api}/tenants/${tenantId}`).pipe(map(() => {
      this.getUserTenants();
    }));
  }
}
