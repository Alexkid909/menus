import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';
import {FoodsService} from '../foods.service';

@Component({
    selector: 'app-delete-food',
    templateUrl: './delete-food.component.html',
    styleUrls: ['./delete-food.component.scss']
})
export class DeleteFoodComponent implements AfterViewInit {

    deleteFoodModal: NgxSmartModalComponent;

    constructor(
        private ngxSmartModalService: NgxSmartModalService,
        private foodsService: FoodsService
    ) {}

    ngAfterViewInit() {
        this.deleteFoodModal = this.ngxSmartModalService.getModal('deleteFoodModal');
    }

    deleteFood() {
        const food = this.deleteFoodModal.getData();
        console.log('food', food);
        this.foodsService.deleteFood(food).subscribe(success => {
            console.log(success);
            this.deleteFoodModal.close();
        }, (error) => {
            console.log(error);
        });
    }

}
