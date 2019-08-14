import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MealsService} from '../meals.service';
import {Meal} from '../classes/meal';

@Component({
    selector: 'app-meals-list',
    templateUrl: './meals-list.component.html',
    styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit, AfterViewInit {

    meals: Array<Meal>;
    @Output() currentMeal = new EventEmitter<Meal>();

    constructor(private mealsService: MealsService) {
    }

    ngOnInit() {
        this.getAllMeals();
    }

    ngAfterViewInit() {
    }

    getAllMeals() {
        this.mealsService.mealsSubject.subscribe((mealsList: Array<Meal>) => {
            this.meals = mealsList;
            if (this.meals) { this.setCurrentFood(this.meals[0]); }
        }, error => console.log(error));
    }

    deleteMeal() {

    }

    showDeleteModal(meal: Meal) {

    }

    setCurrentFood(meal: Meal) {
        this.currentMeal.emit(meal);
    }
}
