import { Component } from '@angular/core';
import { MyCounter } from '../services/my-counter';

@Component({
  selector: 'app-my-counter-service',
  imports: [],
  templateUrl: './my-counter-service.html',
  styleUrl: './my-counter-service.scss',
})
export class MyCounterService {
  counter: number = 0;

  constructor(private counterService: MyCounter) {
    this.counterService.counter$.subscribe((counter) => {
      this.counter = counter;
    });
  }

  inc() {
    this.counterService.inc(this.counter);
  }
  dec() {
    this.counterService.dec(this.counter);
  }
}
