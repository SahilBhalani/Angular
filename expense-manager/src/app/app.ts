import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseManager } from './expense-manager/expense-manager';
import { MyLifecycleSample } from './my-lifecycle-sample/my-lifecycle-sample';
import { ViewEncapsulationSample } from './view-encapsulation-sample/view-encapsulation-sample';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpenseManager, MyLifecycleSample, ViewEncapsulationSample],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('expense-manager');
}
