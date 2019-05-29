import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealsRoutingModule } from './meals/meals-routing.module';
import { FoodsRoutingModule } from './foods/foods-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TenantsRoutingModule } from './tenants/tenants-routing.module';

const appRoutes: Routes = [
    {
      path: 'foods',
      loadChildren: 'app/foods/foods.module#FoodsModule'
    },
    {
      path: 'meals',
      loadChildren: 'app/meals/meals.module#MealsModule'
    },
    {
      path: 'login',
      loadChildren: 'app/auth/auth.module#AuthModule'
    },
    {
      path: 'tenants',
      loadChildren: 'app/tenants/tenants.module#TenantsModule'
    },
    {
      path: '**',
      redirectTo: '/foods'
    }
];

@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes,
          {
            enableTracing: false
          }
      ),
      MealsRoutingModule,
      FoodsRoutingModule,
      TenantsRoutingModule,
      AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
