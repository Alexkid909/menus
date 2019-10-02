import {MealFood} from '../interfaces/meal-food';

export class MealClass {
    name: string;
    foods: Array<MealFood>;
    constructor(name: string) {
        this.name = name;
    }
}
