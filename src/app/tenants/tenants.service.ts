import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {TenantClass} from './classes/tenant.interface';
import {TenantInterface} from '../shared/interfaces/tenant.interface';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {NotificationsService} from '../shared/notifications.service';
import {Notification} from '../shared/classes/notification';
import {NotificationType} from '../shared/interfaces/notification';
import {ErrorService} from '../shared/error.service';
import {SortOrder} from '../shared/classes/sort-order';

@Injectable()

export class TenantsService {

  apiUrl: string;
  currentTenantID: string = null;
  currentTenantIDBehaviourSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  currentTenant: TenantInterface;
  currentTenantBehaviourSubject: BehaviorSubject<TenantInterface> = new BehaviorSubject(null);
  tenants: Array<TenantInterface> = [];
  tenantsBehaviorSubject: BehaviorSubject<Array<TenantInterface>> = new BehaviorSubject([]);
  sortOrder: SortOrder;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private errorService: ErrorService
  ) {
    this.apiUrl = environment.apiUrl;
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
    return this.http.get(`${this.apiUrl}/user/tenants`).pipe(map((results: any) => {
      const searchResults = !term ? [] : results.data.filter((result: TenantInterface) => {
        return result.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      });
      return searchResults;
    }));
  }

  private getUserTenants() {
    let params = new HttpParams();

    if (this.sortOrder) {
      params = params
        .set('sortKey', this.sortOrder.key)
        .set('sortOrder', this.sortOrder.order.toString());
    }

    this.http.get(`${this.apiUrl}/user/tenants`, { params }).subscribe((response: any) => {
      this.tenants = response.data;
      this.broadcastUserTenants();
    });
  }

  public createTenant(tenant: TenantClass) {
    return this.http.post(`${this.apiUrl}/tenants`, {name: tenant.name})
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(() => {
        this.getUserTenants();
        const notification = new Notification(NotificationType.Success, 'Well done you have created a new tenant', 'Tenant Created');
        this.notificationsService.newNotification(notification);
      }));
  }

  public updateTenant(tenantId: string, tenant: TenantClass) {
    return this.http.put(`${this.apiUrl}/tenants/${tenantId}`, {name: tenant.name})
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(() => {
        this.getUserTenants();
        const notification = new Notification(NotificationType.Success, 'Well done you have updated the tenant', 'Tenant Updated');
        this.notificationsService.newNotification(notification);
      }));
  }

  public deleteTenant(tenantId: string) {
    return this.http.delete(`${this.apiUrl}/tenants/${tenantId}`)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(() => {
        this.getUserTenants();
        const notification = new Notification(NotificationType.Success, 'Well done you have deleted the tenant', 'Tenant Deleted');
        this.notificationsService.newNotification(notification);
      }));
  }

  sortTenants(sortOrder: SortOrder) {
    this.sortOrder = sortOrder;
    this.getUserTenants();
  }
}
