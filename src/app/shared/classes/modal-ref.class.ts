import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

export class ModalRefClass {
  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
  private readonly _onClose = new Subject<any>();
  onClose: Observable<any> = this._onClose.asObservable();

  constructor() {}

  closed(result?: any) {
    this._afterClosed.next(result);
  }

  close(result?: any) {
    this._onClose.next(result);
  }
}
