import { FoodInterface } from './food.interface';

export interface MealInterface {
  _id: string;
  name: string;
  foods: Array<FoodInterface>;
}
