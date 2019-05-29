import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodsComponent} from './foods/foods.component';
import {EditFoodComponent} from './edit-food/edit-food.component';
import {AuthGuard} from '../shared/guards/auth.guard';

const foodRoutes: Routes = [
    {
        path: 'foods/:foodId',
        canActivate: [AuthGuard],
        component: EditFoodComponent,
    },
    {
        path: 'foods',
        canActivate: [AuthGuard],
        component: FoodsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(foodRoutes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
