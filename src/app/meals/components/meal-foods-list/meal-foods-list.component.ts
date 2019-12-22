import {Component, Input, OnInit} from '@angular/core';
import {MealFoodInterface} from '../../interfaces/meal-food';
import {MealsService} from '../../meals.service';

@Component({
  selector: 'app-meal-foods-list',
  templateUrl: './meal-foods-list.component.html',
  styleUrls: ['./meal-foods-list.component.scss']
})
export class MealFoodsListComponent implements OnInit {

  @Input() currentMealFoods: Array<MealFoodInterface>;
  @Input() addedMealFoods: Array<MealFoodInterface>;

  constructor() { }

  ngOnInit() {}

}
