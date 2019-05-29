import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FoodsService} from '../foods.service';
import {Food} from '../../shared/classes/food';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';
// import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';

@Component({
    selector: 'app-foods-list',
    templateUrl: './foods-list.component.html',
    styleUrls: ['./foods-list.component.scss']
})
export class FoodsListComponent implements OnInit, AfterViewInit {

    foods: Array<Food>;
    @Output() currentFood = new EventEmitter<Food>();
    deleteFoodModal: NgxSmartModalComponent;

    constructor(private foodsService: FoodsService,
                public ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {
        this.getAllFoods();
    }

    ngAfterViewInit() {
        this.deleteFoodModal = this.ngxSmartModalService.getModal('deleteFoodModal');
    }

    getAllFoods() {
        this.foodsService.foodsSubject.subscribe((foodsList: Array<Food>) => {
            console.log('foodsList', foodsList);
            this.foods = foodsList;
            (this.foods) && this.setCurrentFood(this.foods[0]);
        }, error => console.log(error));
    }

    showDeleteModal(food: Food) {
        console.log('newFood', food);
        this.deleteFoodModal.removeData();
        this.deleteFoodModal.setData(food);
        this.deleteFoodModal.open();
    }

    setCurrentFood(food: Food) {
        this.currentFood.emit(food);
    }
}
