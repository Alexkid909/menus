import { FoodInterface } from './food.interface';

export interface MealInterface {
  _id: string;
  name: string;
  imgSrc: string;
  foods: Array<FoodInterface>;
}
