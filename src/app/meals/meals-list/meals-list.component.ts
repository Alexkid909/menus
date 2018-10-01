import { Component, OnInit } from '@angular/core';
import {MealsService} from '../meals.service';
import {Meal} from '../classes/meal';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit {

  meals: Array<Meal>;
  mealHeaders = ['name'];

  constructor(private mealsService: MealsService) { }

  ngOnInit() {
    this.getAllMeals();
  }

  getAllMeals() {
      this.mealsService.mealsSubject.subscribe((mealsList: Array<Meal>) => {
          console.log('mealsList', mealsList);
          this.meals = mealsList;
      }, error => console.log(error));
  }
  deleteMeal(meal: Meal) {
      this.mealsService.deleteMeal(meal).subscribe(success => {
          console.log(success);
      }, (error) => {
          console.log(error);
      });
  }
}
