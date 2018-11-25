import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MealsService} from '../meals.service';
import {Meal} from '../classes/meal';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';

@Component({
    selector: 'app-meals-list',
    templateUrl: './meals-list.component.html',
    styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit, AfterViewInit {

    meals: Array<Meal>;
    @Output() currentMeal = new EventEmitter<Meal>();
    deleteModal: NgxSmartModalComponent;

    constructor(private mealsService: MealsService,
                private ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {
        this.getAllMeals();
    }

    ngAfterViewInit() {
        this.deleteModal = this.ngxSmartModalService.getModal('deleteMealModal');
    }

    getAllMeals() {
        this.mealsService.mealsSubject.subscribe((mealsList: Array<Meal>) => {
            this.meals = mealsList;
            (this.meals) && this.setCurrentFood(this.meals[0]);
        }, error => console.log(error));
    }

    deleteMeal() {
        const meal = this.deleteModal.getData();
        console.log('meal', meal);
        this.mealsService.deleteMeal(meal).subscribe(success => {
            console.log(success);
            this.deleteModal.close();
        }, (error) => {
            console.log(error);
        });
    }

    showDeleteModal(meal: Meal) {
        console.log('newMeal', meal);
        this.deleteModal.removeData();
        this.deleteModal.setData(meal);
        this.deleteModal.open();
    }

    setCurrentFood(meal: Meal) {
        this.currentMeal.emit(meal);
    }
}
