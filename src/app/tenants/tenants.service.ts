import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TenantClass } from './classes/tenant';
import { TenantInterface } from '../shared/interfaces/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  api = 'https://localhost:8443';
  currentTenantID: string = null;
  currentTenantIDBehaviourSubject: BehaviorSubject<string>;
  tenants: Array<TenantInterface>;
  tenantsBehaviorSubject: BehaviorSubject<Array<TenantInterface>> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getUserTenants();
  }

  private getCurrentTenantID() {
    if (!this.currentTenantID) {
      this.currentTenantID = localStorage.getItem('currentTenantID');
    }
    return this.currentTenantID;
  }

  private setCurrentTenantID(tenantID: string) {
    this.currentTenantID = tenantID;
    localStorage.setItem('currentTenantID', this.currentTenantID);
    this.getUserTenants();
  }

  broadcastCurrentTenantID() {
    this.currentTenantIDBehaviourSubject.next(this.currentTenantID);
  }

  broadcastUserTenants() {
    this.tenantsBehaviorSubject.next(this.tenants);
  }

  getUserTenants() {
    this.http.get(`${this.api}/user/tenants`).subscribe ((response: any) => {
      this.tenants = response.data;
      this.broadcastUserTenants();
    });
  }

  createTenant(tenant: TenantClass) {
    return this.http.post(`${this.api}/tenants`, {name: tenant.name}).pipe(map((response: any) => {
      this.getUserTenants();
    }));
  }

  updateTenant(tenantId: string, tenant: TenantClass) {
    return this.http.put(`${this.api}/tenants/${tenantId}`, {name: tenant.name}).pipe(map((response: any) => {
      this.getUserTenants();
    }));
  }

  deleteTenant(tenantId: string) {
    return this.http.delete(`${this.api}/tenants/${tenantId}`).pipe(map((response: any) => {
      this.getUserTenants();
    }));
  }
}
