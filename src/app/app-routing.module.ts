import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsRoutingModule} from './meals/meals-routing.module';
import {MealsModule} from './meals/meals.module';
import {FoodsRoutingModule} from './foods/foods-routing.module';

const appRoutes: Routes = [
    {
      path: 'meals',
      loadChildren: 'app/meals/meals.module#MealsModule'
    },
    {
      path: 'foods',
      loadChildren: 'app/foods/foods.module#FoodsModule'
    },
    {
      path: '**',
      redirectTo: 'meals'
    }
];

@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes,
          {
            // enableTracing: true
          }
      ),
      MealsRoutingModule,
      FoodsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
