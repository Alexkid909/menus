import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Food} from '../classes/food';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';

@Component({
    selector: 'app-food-actions',
    templateUrl: './food-actions.component.html',
    styleUrls: ['./food-actions.component.scss']
})
export class FoodActionsComponent implements OnInit, AfterViewInit {

    addFoodModal: NgxSmartModalComponent;

    constructor(private ngxSmartModalService: NgxSmartModalService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.addFoodModal = this.ngxSmartModalService.getModal('addFoodModal');
    }

    showAddFoodModal() {
        this.addFoodModal.open();
    }

}
