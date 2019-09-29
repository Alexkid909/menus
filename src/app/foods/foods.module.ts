import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsRoutingModule } from './foods-routing.module';
import {FoodsListComponent} from './foods-list/foods-list.component';
import {FoodsService} from './foods.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FoodsComponent } from './foods/foods.component';
import {FoodActionsComponent} from './food-actions/food-actions.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CurrentTenantInterceptorService} from '../interceptors/current-tenant-interceptor.service';

@NgModule({
  imports: [
      CommonModule,
      FoodsRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
  ],
  providers: [
      FoodsService,
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CurrentTenantInterceptorService,
        multi: true
      }
  ],
  declarations: [
      FoodsListComponent,
      FoodsComponent,
      FoodActionsComponent,
  ],
  exports: [
      FoodsListComponent,
      FoodsComponent
  ]
})
export class FoodsModule { }
