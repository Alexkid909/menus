import { Component, OnInit } from '@angular/core';
import {Meal} from '../classes/meal';
import {ActivatedRoute} from '@angular/router';
import {MealsService} from '../meals.service';
import {Observable} from 'rxjs/Observable';
import {mergeMap} from 'rxjs/operator/mergeMap';


@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})
export class EditMealComponent implements OnInit {

  meal: Meal;

  constructor(
      private activatedRoute: ActivatedRoute,
      private mealsService: MealsService

  ) {}

  getMeal(id) {
    this.mealsService.getMeal(id);
  }
  saveMeal(meal: Meal) {
      this.mealsService.updateMeal(meal).subscribe((success: Meal) => {

      });
  }

  ngOnInit() {
      this.mealsService.mealSubject.subscribe((meal: Meal) => {
          this.meal = meal;
          console.log('meal updated', this.meal);
      });
      this.activatedRoute.params.subscribe((params) => {
      console.log(params);
        this.getMeal(params.mealId);
    });
  }
}
