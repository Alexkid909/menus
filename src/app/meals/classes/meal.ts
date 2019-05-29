import {MealFood} from '../interfaces/meal-food';

export class Meal {
    _id: string;
    name: string;
    foods?: Array<MealFood>;
    constructor(_id: string, name: string) {
        this._id = _id;
        this.name = name;
    }
}
