import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';

import {MealsListComponent} from './meals-list/meals-list.component';
import {MealsService} from './meals.service';
import {AddMealComponent} from './add-meal/add-meal.component';
import {FormsModule} from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import { MealActionsComponent } from './meal-actions/meal-actions.component';

@NgModule({
  imports: [
      CommonModule,
      MealsRoutingModule,
      FormsModule,
      NgxSmartModalModule.forChild()
  ],
  providers: [
      MealsService
  ],
  declarations: [
      MealsListComponent,
      AddMealComponent,
      MealsComponent,
      EditMealComponent,
      MealActionsComponent
  ],
  exports: [
      MealsListComponent,
      AddMealComponent,
      MealsComponent
  ]
})
export class MealsModule { }
