import { FoodInterface } from './food';

export interface MealInterface {
  _id: string;
  name: string;
  foods: Array<FoodInterface>;
}
