import {FoodInterface} from '../../shared/interfaces/food.interface';

export class MealFoodClass {
  food: FoodInterface;
  qty: number;

  constructor(food: FoodInterface, qty: number) {
    this.food = food;
    this.qty = qty;
  }
}
