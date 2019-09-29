import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

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

  constructor() {}

  ngOnInit() {
    this.searchTerm = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('searchSource') && changes.searchSource.currentValue) {
      // console.log('searchTerm', this.searchTerm);
      this.search();
    }
    if (changes.hasOwnProperty('resultsPlaceholder') && changes.resultsPlaceholder.currentValue) {
      // console.log('searchTerm', this.resultsPlaceholder);
    }
  }

  searchTermChange(event) {
    this.onSearchTermChange.emit(event);
  }

  resultSelected(event) {
    this.onResultSelected.emit(event);
    this.searchResults = [];
    this.searchTerm = '';
  }

  search() {
    this.searchSource.subscribe((result: Array<any>) => {
      this.searchResults = result;
      // console.log('this.searchResults', this.searchResults);
    });
  }

}
