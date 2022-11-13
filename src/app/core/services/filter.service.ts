import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export default class FilterValueService {
  public filterInput$: Subject<string> = new BehaviorSubject<string>('');

  public sendFilterValue(value = ''): void {
    this.filterInput$.next(value);
  }

  public getFilterValue(): Observable<string> {
    return this.filterInput$.asObservable();
  }
}
