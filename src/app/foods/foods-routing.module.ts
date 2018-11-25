import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodsComponent} from './foods/foods.component';
import {EditFoodComponent} from './edit-food/edit-food.component';

const foodRoutes: Routes = [
    {
        path: 'foods/food/:foodId',
        component: EditFoodComponent
    },
    {
        path: 'foods',
        component: FoodsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(foodRoutes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
