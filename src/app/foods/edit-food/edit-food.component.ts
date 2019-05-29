import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Food} from '../../shared/classes/food';
import {FoodsService} from '../foods.service';


@Component({
    selector: 'app-edit-food',
    templateUrl: './edit-food.component.html',
    styleUrls: ['./edit-food.component.scss']
})
export class EditFoodComponent implements OnChanges{

    @Input() currentFood: Food;
    food: Food;

    constructor(private foodsService: FoodsService) {}

    ngOnChanges(simpleChanges: SimpleChanges) {
        (simpleChanges.hasOwnProperty('currentFood')) && this.setFood(simpleChanges.currentFood.currentValue);
    }

    saveFood() {
        console.log(this.currentFood);
        this.foodsService.updateFood(this.currentFood).subscribe((success: Food) => {
            console.log(success);
        });
    }

    setFood(food: Food) {
        this.food = food;
    }
}
