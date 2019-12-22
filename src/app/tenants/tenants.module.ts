import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { TenantsComponent } from './components/tenants/tenants.component';
import { TenantsService } from './tenants.service';
import { TenantsRoutingModule} from './tenants-routing.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TenantComponent } from './components/tenant/tenant.component';
import { AuthTokenInterceptorService } from '../interceptors/auth-token-interceptor.service';
import { FilesModule } from '../files/files.module';

@NgModule({
  imports: [
    TenantsRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    FilesModule
  ],
  providers: [
    TenantsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptorService,
      multi: true
    }
  ],
  declarations: [
    TenantsComponent,
    TenantComponent
  ],
  exports: [
    TenantsComponent
  ]
})
export class TenantsModule { }
