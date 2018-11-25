import {AfterViewInit, Component} from '@angular/core';
import {NgxSmartModalComponent, NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-meal-actions',
  templateUrl: './meal-actions.component.html',
  styleUrls: ['./meal-actions.component.scss']
})
export class MealActionsComponent implements AfterViewInit {

    addMealModal: NgxSmartModalComponent;

    constructor(private ngxSmartModalService: NgxSmartModalService) {

    }

    ngAfterViewInit() {
        this.addMealModal = this.ngxSmartModalService.getModal('addMealModal');
    }

    showAddMealModal() {
        this.addMealModal.open();
    }

}
