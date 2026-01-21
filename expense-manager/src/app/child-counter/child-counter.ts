import { Component } from '@angular/core';

@Component({
  selector: 'app-child-counter',
  imports: [],
  templateUrl: './child-counter.html',
  styleUrl: './child-counter.scss',
})
export class ChildCounter {
  counter: number = 0;

  inc() {
    this.counter++;
  }
  dec() {
    this.counter--;
  }
}
