import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MealFoodInterface} from '../../interfaces/meal-food';
import {MealsService} from '../../meals.service';

@Component({
  selector: 'app-meal-foods-list',
  templateUrl: './meal-foods-list.component.html',
  styleUrls: ['./meal-foods-list.component.scss']
})
export class MealFoodsListComponent implements OnInit, OnChanges {

  @Input() mealId: string;
  currentMealFoods: Array<MealFoodInterface>;
  @Input() addedMealFoods: Array<MealFoodInterface>;

  constructor(private mealsService: MealsService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mealId && changes.mealId.currentValue) {
      this.getCurrentMealFoods();
    }
  }

  getCurrentMealFoods() {
    this.currentMealFoods = [];
    this.mealsService.getMealFoods(this.mealId).subscribe((response: any) => {
      this.currentMealFoods = response.data;
    });
  }
}
