import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {debounceTime, delay, distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() searchSource: Observable<any>;
  @Output() onResultSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTermChange: EventEmitter<string> = new EventEmitter<string>();
  searchResults: Array<any>;
  @Input() resultsPlaceholder = 'Search Here';
  searchTerm: string;
  @Input() labelText: string;
  @Input() cssClasses: string | Array<string>;
  @Input() resetTerm: Observable<string>;
  searchSourceBehaviorSubject: BehaviorSubject <Observable<any>> = new BehaviorSubject(new Observable());

  constructor() {}

  ngOnInit() {
    this.searchTerm = '';
    if (this.resetTerm) {
      this.resetTerm.subscribe(() => {
        console.log('this.searchTerm', this.searchTerm);
        this.searchTerm = '';
        console.log('this.searchTerm', this.searchTerm);
      });
    }
    this.searchSourceBehaviorSubject
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .pipe(delay(200))
      .subscribe(this.search.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.hasOwnProperty('searchSource') && changes.searchSource.currentValue) {
      this.searchSourceBehaviorSubject.next(changes.searchSource.currentValue);
    }
  }

  searchTermChange(event) {
    this.onSearchTermChange.emit(event);
  }

  resultSelected(event) {
    console.log('result selected', event);
    this.onResultSelected.emit(event);
    this.searchResults = [];
    this.searchTerm = '';
  }

  search() {
    this.searchSource.subscribe((result: Array<any>) => {
      this.searchResults = result;
    });
  }

}
