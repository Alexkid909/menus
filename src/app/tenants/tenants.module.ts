import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { TenantsComponent } from './tenants/tenants.component';
import { TenantsService } from './tenants.service';
import { TenantsRoutingModule} from './tenants-routing.module';
import {AuthGuard} from '../shared/guards/auth.guard';

@NgModule({
  imports: [
    TenantsRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    TenantsService,
    AuthGuard
  ],
  declarations: [
    TenantsComponent
  ],
  exports: [
    TenantsComponent
  ]
})
export class TenantsModule { }
