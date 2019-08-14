import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FoodsService} from '../foods.service';
import {Food} from '../../shared/classes/food';

@Component({
    selector: 'app-foods-list',
    templateUrl: './foods-list.component.html',
    styleUrls: ['./foods-list.component.scss']
})
export class FoodsListComponent implements OnInit {

    foods: Array<Food>;
    @Output() currentFood = new EventEmitter<Food>();

    constructor(private foodsService: FoodsService) {
    }

    ngOnInit() {
        this.getAllFoods();
    }

    getAllFoods() {
        this.foodsService.foodsSubject.subscribe((foodsList: Array<Food>) => {
            console.log('foodsList', foodsList);
            this.foods = foodsList;
            if (this.foods) { this.setCurrentFood(this.foods[0]); }
        }, error => console.log(error));
    }

    showDeleteModal(food: Food) {
        console.log('newFood', food);
    }

    setCurrentFood(food: Food) {
        this.currentFood.emit(food);
    }
}
