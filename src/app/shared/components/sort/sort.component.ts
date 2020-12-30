import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortOrder } from '../../classes/sort-order';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  sortForm: FormGroup;
  @Input() sortOrders: Array<SortOrder> = [];
  @Output() sortSelected: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      sortOrder: null
    });

    this.sortForm.valueChanges.subscribe((changes) => {
      if (changes.hasOwnProperty('sortOrder') && changes.sortOrder) {
        this.sortSelected.emit(changes.sortOrder as SortOrder);
      }
      console.log('sort form', changes);
    });
  }
}
