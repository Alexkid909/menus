import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

export class ModalRef {
  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();

  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }
}
