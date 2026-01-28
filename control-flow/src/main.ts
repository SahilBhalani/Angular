import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  template: `
    <!-- Control Flow -->
    <h3>Control Flow</h3>
    <button (click)="show.set(!show())">Toggle</button>
    <button (click)="items.set([])">Clear</button>
    <button (click)="reset()">Reset</button>

    @if (show()) {
      <p>Visible</p>
    } @else {
      <p>Hidden</p>
    }

    <ul>
      @for (item of items(); track item) {
        <li>{{ item }}</li>
      } @empty {
        <li>No Items</li>
      }
    </ul>
    <hr />

    <!-- Working With Signals -->
    <h3>Signals</h3>
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="inc()">Increment</button>
  `,
})
export class App {
  show = signal(true);
  items = signal(['One', 'Two', 'Three']);
  reset() {
    this.items.set(['One', 'Two', 'Three']);
  }

  count = signal(0);
  double = computed(() => this.count() * 2);
  constructor() {
    effect(() => console.log('Count Changed', this.count()));
  }
  inc() {
    this.count.update((n) => n + 1);
  }
}

bootstrapApplication(App);
