import { CommonModule } from '@angular/common';
import { Component, Injectable, signal, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
class CounterStore {
  count = signal(0);
  inc() {
    this.count.update((n) => n + 1);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  template: `
    <!-- Service with Signals -->
    <p>Count: {{ store.count() }}</p>
    <button (click)="store.inc()">Increment</button>
  `,
})
export class App {
  store = inject(CounterStore);
}

bootstrapApplication(App);
