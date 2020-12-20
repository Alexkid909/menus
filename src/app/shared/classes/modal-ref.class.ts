import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

export class ModalRefClass {
  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
  private readonly _onClose = new Subject<any>();
  onClose: Observable<any> = this._onClose.asObservable();
  private _isClosed: boolean;

  constructor() {}

  closed() {
    this._isClosed = true;
    this._afterClosed.next(this.isClosed);
  }

  close(result?: any) {
    this._onClose.next(result);
  }

  get isClosed(): Boolean {
    return this._isClosed;
  }
}
