import {Component, OnInit} from '@angular/core';
import {Food} from '../../shared/classes/food';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  currentFood: Food;

  ngOnInit() {}

  setCurrentFood(food: Food) {
    console.log('food', food);
    this.currentFood = food;
  }
}
