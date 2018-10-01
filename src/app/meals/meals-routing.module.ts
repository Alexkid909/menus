import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsComponent} from './meals/meals.component';
import {EditMealComponent} from './edit-meal/edit-meal.component';

const mealRoutes: Routes = [
    {
        path: 'meals/meal/:mealId',
        component: EditMealComponent
    },
    {
        path: 'meals',
        component: MealsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(mealRoutes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
