import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsComponent} from './meals/meals.component';
import {EditMealComponent} from './edit-meal/edit-meal.component';
import {AuthGuard} from '../shared/guards/auth.guard';

const mealRoutes: Routes = [
    {
        path: 'meals/meal/:mealId',
        canActivate: [AuthGuard],
        component: EditMealComponent
    },
    {
        path: 'meals',
        canActivate: [AuthGuard],
        component: MealsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(mealRoutes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
