import {Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortOrder } from '../../classes/sort-order';
import {SortService} from '../../sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {

  constructor(private fb: FormBuilder,
  private sortService: SortService) { }

  sortForm: FormGroup;
  sortOrders: Array<SortOrder> = [];

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      sortOrder: null
    });

    this.sortService.sortOrdersBehaviourSubject.subscribe((sortOrders: Array<SortOrder>) => {
      console.log('sort service orders recieved', sortOrders);
      this.sortOrders = sortOrders;
    });

    this.sortForm.valueChanges.subscribe((changes: any) => {
      if (changes.sortOrder) {
        this.sortService.setSortOrder(changes.sortOrder);
      }
    });
  }
}
