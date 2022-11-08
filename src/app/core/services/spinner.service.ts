import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class SpinnerService {
  private loading: boolean = false;

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public getLoading(): boolean {
    return this.loading;
  }
}
