import { Component, OnInit } from '@angular/core';
import {Meal} from '../../meals/classes/meal';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent {

    currentMeal: Meal;

    setCurrentMeal(meal: Meal) {
        console.log('meal', meal);
        this.currentMeal = meal;
    }

}
