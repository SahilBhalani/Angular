import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseManager } from './expense-manager/expense-manager';
import { MyLifecycleSample } from './my-lifecycle-sample/my-lifecycle-sample';
import { ViewEncapsulationSample } from './view-encapsulation-sample/view-encapsulation-sample';
import { InOutChildSample } from './in-out-child-sample/in-out-child-sample';
import { ChildCounter } from './child-counter/child-counter';
import { MyCounterService } from './my-counter-service/my-counter-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ExpenseManager,
    MyLifecycleSample,
    ViewEncapsulationSample,
    ChildCounter,
    MyCounterService,
  ],
  template: `<style>
      h1 {
        color: red;
      }
    </style>
    <h1>Hello</h1> `,
  templateUrl: './app.html',
  styles: ['p { font-style: italic }', 'em { font-style: italic; font-weight: bold}'],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('expense-manager');

  @ViewChild(ChildCounter)
  private child!: ChildCounter;

  inc() {
    this.child.inc();
  }
  dec() {
    this.child.dec();
  }
  counter() {
    return 0;
  }
  ngAfterViewInit() {
    setTimeout(() => (this.counter = () => this.child.counter), 0);
  }
}
