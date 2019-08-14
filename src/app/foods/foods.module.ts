import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsRoutingModule } from './foods-routing.module';
import {FoodsListComponent} from './foods-list/foods-list.component';
import {FoodsService} from './foods.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FoodsComponent } from './foods/foods.component';
import {FoodActionsComponent} from './food-actions/food-actions.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/guards/auth.guard';

@NgModule({
  imports: [
      CommonModule,
      FoodsRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
  ],
  providers: [
      FoodsService,
      AuthGuard
  ],
  declarations: [
      FoodsListComponent,
      FoodsComponent,
      FoodActionsComponent,
  ],
  exports: [
      FoodsListComponent,
      FoodsComponent
  ]
})
export class FoodsModule { }
