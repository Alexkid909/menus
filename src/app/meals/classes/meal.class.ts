import { MealFoodInterface } from '../interfaces/meal-food';

export class MealClass {
    name: string;
    foods: Array<MealFoodInterface>;
    imgSrc?: string;
    constructor(name: string, imgSrc?: string) {
        this.name = name;
        this.imgSrc = imgSrc;
    }
}
