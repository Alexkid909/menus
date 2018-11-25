import { Component } from '@angular/core';

export interface Modal {
    title: string;
    message: string;
}

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent  {
    title: string;
    message: string;
    constructor() {
        // super();
    }
    confirm() {
        // we set modal result as true on click on confirm button,
        // then we can get modal result from caller code
        // this.result = true;
        // this.close();
    }
}
