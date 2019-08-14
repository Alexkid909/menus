import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodsComponent} from './foods/foods.component';
import {AuthGuard} from '../shared/guards/auth.guard';

const foodRoutes: Routes = [
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
