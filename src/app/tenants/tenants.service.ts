import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  api = 'https://localhost:8443';
  currentTenantID: string = null;
  currentTenantIDBehaviourSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {

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

  }

  broadcastCurrentTenantID() {
    this.currentTenantIDBehaviourSubject.next(this.currentTenantID);
  }

  getUserTenants() {
    return this.http.get(`${this.api}/user/tenants`);
  }

}
