import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Tenant} from './interfaces/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  api = 'https://localhost:8443';
  currentTenantID: string = null;
  currentTenantIDBehaviourSubject: BehaviorSubject<string>;
  tenants: Array<Tenant>;
  tenantsBehaviorSubject: BehaviorSubject<Array<Tenant>> = new BehaviorSubject([]);

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

  createTenant(name: string) {
    return this.http.post(`${this.api}/tenants`, {name}).pipe(map((response: any) => {
      this.getUserTenants();
    }));
  }

  updateTenant(tenantId: string, name: string) {
    this.http.post(`${this.api}/tenants`, {name});
  }

}
