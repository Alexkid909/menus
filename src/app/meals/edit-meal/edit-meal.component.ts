import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Meal} from '../classes/meal';
import {MealsService} from '../meals.service';
import {FoodsService} from '../../foods/foods.service';
import {Food} from '../../shared/classes/food';
import {MealFood} from '../interfaces/meal-food';


@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})
export class EditMealComponent implements OnInit, OnChanges {

    @Input() currentMeal: Meal;
    meal: Meal;
    availableFoods: Array<MealFood>;
    selectedFood: MealFood;
    mealFoodQty: number;
    foodsList: Array<Food>;
    mealFoods: any;

    constructor(private mealsService: MealsService,
                private foodsService: FoodsService) {}

    ngOnInit() {
        this.foodsService.foodsSubject.subscribe((foodsList: Array<Food>) => {
            if (foodsList) {
                this.availableFoods = foodsList.map((food: MealFood) => {
                    food['qty'] = 0;
                    return food;
                });
                this.foodsList = foodsList;
                // console.log('this.availableFoods', this.availableFoods);
                (this.selectedFood = this.availableFoods[0]);
                this.mealFoodQty = 0;
                console.log('this.selectedFood.name', this.selectedFood.name);
            }
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
      if (simpleChanges.hasOwnProperty('currentMeal') && simpleChanges.currentMeal && simpleChanges.currentMeal.currentValue) {
        console.log('simpleChanges', simpleChanges);
        this.getMealFoods();
      }
    }

    saveMeal() {
        console.log(this.currentMeal);
        this.mealsService.updateMeal(this.currentMeal).subscribe((success: Meal) => {
            console.log('success', success);
        }, error => console.log(error));
    }

    getMealFoods() {
      this.mealsService.getMealFoods(this.currentMeal._id).subscribe(success => {
        this.mealFoods = success;
      }, error => console.log(error));
    }

    updateMealFoods() {
      console.log(this.currentMeal);
      this.mealsService.updateMealFoods(this.currentMeal._id, this.selectedFood).subscribe(response => {
        console.log('update meal response', response);
      }, error => console.log(error));
    }

    deleteMealFood(mealFood: MealFood) {
      console.log(mealFood);
      this.mealsService.deleteMealFood(mealFood).subscribe(response => {
        console.log(response);
      }, error => console.log(error));
    }
}
