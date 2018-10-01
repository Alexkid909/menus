import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsRoutingModule} from './meals/meals-routing.module';
import {MealsModule} from './meals/meals.module';

const appRoutes: Routes = [
    {
      path: 'meals',
      loadChildren: 'app/meals/meals.module#MealsModule'
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
            enableTracing: true
          }
      ),
      MealsModule,
      MealsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
