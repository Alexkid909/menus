import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ComponentConfig} from '../component.config';
import {ModalRefClass} from '../classes/modal-ref.class';
import {TenantInterface} from '../interfaces/tenant.interface';
import {SearchComponent} from '../components/search/search.component';
import {TenantsService} from '../../tenants/tenants.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Notification} from '../classes/notification';
import {NotificationType} from '../interfaces/notification';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, AfterViewInit  {

  @ViewChild(SearchComponent) searchComponent: SearchComponent;
  searchTenantsSource: Observable<Array<TenantInterface>>;
  isAuthed: boolean;
  currentTenant: TenantInterface;

  constructor(
    public config: ComponentConfig,
    public sideBar: ModalRefClass,
    private authService: AuthService,
    private tenantsService: TenantsService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe((state: boolean) => {
      this.isAuthed = state;
      this.searchTenantsSource = state ? this.tenantsService.searchTenants('') : undefined;
    });

    this.tenantsService.currentTenantBehaviourSubject.subscribe((currentTenant: TenantInterface) => {
      this.currentTenant = currentTenant;
    });
  }

  cancel() {
    this.sideBar.close();
  }

  ngAfterViewInit() {
  }

  setCurrentTenant(tenant: TenantInterface) {
    this.currentTenant = tenant;
    this.tenantsService.setCurrentTenant(tenant._id);
  }

  searchTenants(event) {
    this.searchTenantsSource = this.tenantsService.searchTenants(event);
  }

  logout() {
    this.authService.logout().subscribe((success: string) => {
     this.router.navigate(['login']);
     this.sideBar.close();
      const notification = new Notification(NotificationType.Success, 'You have logged out', 'Logged Out');
      this.notificationsService.newNotification(notification);
   });
  }
}
