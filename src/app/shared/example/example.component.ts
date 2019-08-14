import { Component } from '@angular/core'
import {ModalConfig} from '../modal-config';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {

  constructor(public config: ModalConfig) {

  }

  onClose() {
    console.log('close clicked');
  }
}
