import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
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
  inputActive = false;
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() inputBlur: EventEmitter<null> = new EventEmitter<null>();
  @Input() required = false;
  @Input() resetOnResultSelection = true;
  @Input() deactivateOnResultSelection = true;

  constructor() {
    this.searchResults = [];
  }

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
    if (changes.hasOwnProperty('searchSource') && changes.searchSource.currentValue) {
      this.searchSourceBehaviorSubject.next(changes.searchSource.currentValue);
    }
  }

  onBlur(e: any) {
    this.setActive(false);
    this.resetSearch();
    this.inputBlur.emit();
  }

  setActive(newValue: boolean) {
    this.inputActive = newValue;
    if (newValue) {
      this.searchInput.nativeElement.focus();
    } else {
      this.searchInput.nativeElement.blur();
    }
  }

  searchTermChange(event) {
    this.onSearchTermChange.emit(event);
  }

  resultSelected(event) {
    console.log('result selected', event);
    this.onResultSelected.emit(event);
    if (this.deactivateOnResultSelection) {
      this.setActive(false);
    }
    this.searchTerm = event.name;
    if (this.resetOnResultSelection) {
      this.resetSearch();
    }
  }

  search() {
    this.searchSource.subscribe((result: Array<any>) => {
      this.searchResults = result;
    });
  }

  resetSearch() {
    this.searchResults = [];
    this.searchTerm = '';
  }
}
