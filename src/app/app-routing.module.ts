import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealsRoutingModule } from './meals/meals-routing.module';
import { FoodsRoutingModule } from './foods/foods-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TenantsRoutingModule } from './tenants/tenants-routing.module';

const appRoutes: Routes = [
    {
      path: 'foods',
      loadChildren: () => import('./foods/foods.module').then(mod => mod.FoodsModule)
    },
    {
      path: 'meals',
      loadChildren: () => import('./meals/meals.module').then(mod => mod.MealsModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
      path: 'sign-up',
      loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
      path: 'tenants',
      loadChildren: () => import('./tenants/tenants.module').then(mod => mod.TenantsModule)
    },
    {
      path: '**',
      redirectTo: '/tenants'
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
