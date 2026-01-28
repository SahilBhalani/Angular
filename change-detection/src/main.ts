import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
  template: `
    <!-- Change Detection Strategy -->
    <h3>OnPush + Signals</h3>
    <p>Count: {{ count() }}</p>
    <button (click)="inc()">Increment</button>

    <ul>
      @for (item of items(); track item.id) {
        <li>{{ item.label }}</li>
      }
    </ul>
  `,
})
export class App {
  count = signal(0);
  items = signal([
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
  ]);
  inc() {
    this.count.set(this.count() + 1);
  }
}

bootstrapApplication(App);
