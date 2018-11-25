import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FoodsService} from '../foods.service';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements AfterViewInit {

  foodName: string;
  foodMeasurement: string;
  addFoodModal: NgxSmartModalComponent;

  constructor(private foodService: FoodsService,
              private ngxSmartModalService: NgxSmartModalService) { }

  ngAfterViewInit() {
    this.addFoodModal = this.ngxSmartModalService.getModal('addFoodModal');
  }

  addFood() {
    this.foodService.createFood(this.foodName, this.foodMeasurement).subscribe((response) => {
      console.log(response);
      this.foodName = '';
      this.foodMeasurement = '';
    });
    this.addFoodModal.close();
  }

}
