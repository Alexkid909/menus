import {AfterViewInit, Component, OnInit} from '@angular/core';
// import {Meal} from '../classes/meal';
import {MealsService} from '../meals.service';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements AfterViewInit {

    mealName: string;
    mealMeasurement: string;
    addMealModal: NgxSmartModalComponent;

    constructor(private mealsService: MealsService,
                private ngxSmartModalService: NgxSmartModalService) { }

    ngAfterViewInit() {
        this.addMealModal = this.ngxSmartModalService.getModal('addMealModal');
    }

    addMeal() {
        this.mealsService.createMeal(this.mealName).subscribe((response) => {
            console.log(response);
            this.mealName = '';
        });
        this.addMealModal.close();
    }
}
