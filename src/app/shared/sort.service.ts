import { Injectable } from '@angular/core';
import {SortOrder} from './classes/sort-order';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  selectedSortOrder: SortOrder;
  selectedSortOrderBehaviourSubject: BehaviorSubject<SortOrder | null> = new BehaviorSubject<SortOrder>(null);
  sortOrders: Array<SortOrder>;
  sortOrdersBehaviourSubject: BehaviorSubject<Array<SortOrder | null>> = new BehaviorSubject<Array<SortOrder|null>>([]);

  constructor() { }

  setSortOrder(sortOrder: SortOrder) {
    console.log('sort keys', this.selectedSortOrder);
    this.selectedSortOrder = sortOrder;
    this.selectedSortOrderBehaviourSubject.next(this.selectedSortOrder);
  }

  setSortOrders(sortOrders: Array<SortOrder>) {
    this.sortOrders = sortOrders;
    this.sortOrdersBehaviourSubject.next(this.sortOrders);
  }
}
