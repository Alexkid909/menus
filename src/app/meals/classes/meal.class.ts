import { MealFoodInterface } from '../interfaces/meal-food';

export class MealClass {
    name: string;
    foods: Array<MealFoodInterface>;
    constructor(name: string) {
        this.name = name;
    }
}
