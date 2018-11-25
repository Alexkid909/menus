import {Food} from '../../foods/classes/food';

export interface MealFood extends Food {
    qty: number;
}
