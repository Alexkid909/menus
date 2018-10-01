import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';


import {MealsListComponent} from './meals-list/meals-list.component';
import {MealsService} from './meals.service';
import {AddMealComponent} from './add-meal/add-meal.component';
import {FormsModule} from '@angular/forms';
import { MealsComponent } from './meals/meals.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';

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
      AddMealComponent,
      MealsComponent,
      EditMealComponent
  ],
  exports: [
      MealsListComponent,
      AddMealComponent,
      MealsComponent
  ]
})
export class MealsModule { }
