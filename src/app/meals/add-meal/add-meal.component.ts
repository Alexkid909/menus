import { Component, OnInit } from '@angular/core';
// import {Meal} from '../classes/meal';
import {MealsService} from '../meals.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {

  mealName = ``;

  constructor(private mealService: MealsService) { }

  ngOnInit() {

  }

  createMeal() {
    this.mealService.createMeal(this.mealName).subscribe((success) => {
      console.log(success);
    }, (error) => {
      console.log(error);
    });
  }



}
