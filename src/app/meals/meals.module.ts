import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsService } from './meals.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MealsComponent } from './components/meals/meals.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CurrentTenantInterceptorService} from '../interceptors/current-tenant-interceptor.service';
import { MealFoodsComponent } from './components/meal-foods/meal-foods.component';
import { MealFoodsListComponent } from './components/meal-foods-list/meal-foods-list.component';

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
      MealFoodsComponent,
      MealFoodsListComponent,
  ],
  exports: [
      MealsComponent
  ]
})
export class MealsModule { }
