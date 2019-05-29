import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsRoutingModule } from './foods-routing.module';
import {FoodsListComponent} from './foods-list/foods-list.component';
import {FoodsService} from './foods.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FoodsComponent } from './foods/foods.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {AddFoodComponent} from './add-food/add-food.component';
import {FoodActionsComponent} from './food-actions/food-actions.component';
import { DeleteFoodComponent } from './delete-food/delete-food.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/guards/auth.guard';

@NgModule({
  imports: [
      CommonModule,
      FoodsRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      NgxSmartModalModule.forChild()
  ],
  providers: [
      FoodsService,
      AuthGuard
  ],
  declarations: [
      FoodsListComponent,
      AddFoodComponent,
      FoodsComponent,
      EditFoodComponent,
      FoodActionsComponent,
      DeleteFoodComponent
  ],
  exports: [
      FoodsListComponent,
      FoodsComponent
  ]
})
export class FoodsModule { }
