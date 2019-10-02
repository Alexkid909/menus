import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsService } from './meals.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CurrentTenantInterceptorService} from '../interceptors/current-tenant-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    MealsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    MealsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CurrentTenantInterceptorService,
      multi: true
    }
  ],
  declarations: [
      MealsComponent,
  ],
  exports: [
      MealsComponent
  ]
})
export class MealsModule { }
