import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyCounter {
  constructor() {}

  private counterSource = new Subject<number>();
  public counter$ = this.counterSource.asObservable();

  inc(val: number) {
    this.counterSource.next(val + 1);
  }
  dec(val: number) {
    this.counterSource.next(val - 1);
  }
}
