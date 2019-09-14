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

  constructor() { }

  ngOnInit() {
    this.searchTerm = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.hasOwnProperty('searchSource') && changes.searchSource.currentValue) {
      this.search();
    }
  }

  searchTermChange(event) {
    this.onSearchTermChange.emit(event);
  }

  resultSelected(event) {
    this.onResultSelected.emit(event);
  }

  search() {
    this.searchSource.subscribe((result: Array<any>) => {
      this.searchResults = result;
      console.log('this.searchResults', this.searchResults);
    });
  }


}
