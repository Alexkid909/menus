import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsRoutingModule } from './meals-routing.module';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsService } from './meals.service';
import { FormsModule } from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import { MealActionsComponent } from './meal-actions/meal-actions.component';

@NgModule({
  imports: [
      CommonModule,
      MealsRoutingModule,
      FormsModule,
  ],
  providers: [
      MealsService
  ],
  declarations: [
      MealsListComponent,
      MealsComponent,
      MealActionsComponent
  ],
  exports: [
      MealsListComponent,
      MealsComponent
  ]
})
export class MealsModule { }
