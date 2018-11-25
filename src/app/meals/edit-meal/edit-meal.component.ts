import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Meal} from '../classes/meal';
import {MealsService} from '../meals.service';
import {FoodsService} from '../../foods/foods.service';
import {Food} from '../../foods/classes/food';
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
    selectedFoodId: string;
    mealFoodQty: number;
    foodsList: Array<Food>;

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
                console.log('this.availableFoodsList', this.availableFoods);
                (this.selectedFoodId = this.availableFoods[0]._id);
                this.mealFoodQty = 0;
                console.log('this.selectedFood', this.selectedFoodId);
            }
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
    }

    saveMeal() {
        console.log(this.currentMeal);
        this.mealsService.updateMeal(this.currentMeal).subscribe((success: Meal) => {
            console.log(success);
        });
    }

    setMeal(meal: Meal) {
        this.meal = meal;
    }

    logSelectedFood() {
        console.log('this.selectedFood', this.selectedFoodId);
    }

    getAvailableFood(id) {
        console.log(id);
        return (id) && this.availableFoods.find((availableFood) => availableFood.id === id);
    }
}