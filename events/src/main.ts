import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      .toolbar {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      ul {
        margin-top: 10px;
      }
      li {
        line-height: 1.8;
      }
      input[type='text'] {
        padding: 6px 8px;
      }
    `,
  ],
  template: `
    <!-- Basic Events -->
    <h3>Events</h3>
    <p>Count: {{ count }}</p>
    <button (click)="increment()">Click me</button>

    <div style="margin-top: 12px">
      <input placeholder="Type..." (input)="onInput($event)" (keyup)="lastKey = $any($event).key" />
      <p>Value: {{ value }}</p>
      <p>Last Key: {{ lastKey }}</p>
    </div>
    <hr />

    <!-- Event Filtering -->
    <h3>Event Filtering (keyup.enter)</h3>

    <div class="toolbar">
      <input
        type="text"
        placeholder="Add item and press Enter"
        [value]="draft"
        (input)="draft = $any($event.target).value"
        (keyup)="lastKey = $any($event).key"
        (keyup.enter)="add()"
      />
      <button (click)="add()">Add</button>
      <button (click)="clear()" [disabled]="items.length === 0">Clear</button>
      <span style="margin-left: 8px; color: #666">Last Key: {{ lastKey }}</span>
    </div>

    <ul>
      <li *ngFor="let item of items; let i = index">{{ i + 1 }}. {{ item }}</li>
    </ul>
    <hr />

    <!-- Debounced Input -->
    <h3>Debounced Input</h3>
    <input type="text" placeholder="Type here" (input)="OnInput($event)" />
    <p>Immediate: {{ immediate }}</p>
    <p>Debounced (400ms): {{ debounced }}</p>
  `,
})
export class App {
  count = 0;
  value = '';
  lastKey = '';

  increment() {
    this.count++;
  }
  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  draft = '';
  items = ['Buy Milk', 'Learn Angular'];

  add() {
    const v = (this.draft || '').trim();
    if (!v) return;
    this.items = [...this.items, v];
    this.draft = '';
  }

  clear() {
    this.items = [];
  }

  immediate = '';
  debounced = '';
  private handle: any;

  OnInput(e: Event) {
    const v = (e.target as HTMLInputElement)?.value ?? '';
    this.immediate = v;
    clearTimeout(this.handle);
    this.handle = setTimeout(() => (this.debounced = v), 400);
  }
}

bootstrapApplication(App);
