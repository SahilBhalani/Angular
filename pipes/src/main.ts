import { CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { interval, of } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';

@Pipe({ name: 'titlecase2', standalone: true })
export class TitleCase2Pipe {
  transform(value: any) {
    if (!value) return '';
    return String(value)
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCase2Pipe],
  styles: [``],
  template: `
    <!-- Basic Pipes -->
    <h3>Pipes</h3>
    <p>{{ title | uppercase }}</p>
    <p>{{ price | currency: 'USD' }}</p>
    <p>{{ today | date: 'mediumDate' }}</p>
    <p>{{ percent | percent: '1.0-2' }}</p>
    <hr />

    <!-- Async Pipes -->
    <h3>Async Pipes</h3>
    <p>Time: {{ time$ | async | date: 'mediumTime' }}</p>

    <h4>Users (delayed)</h4>
    <p *ngIf="!(users$ | async); else list">Loading...</p>
    <ng-template #list>
      <ul>
        <li *ngFor="let u of users$ | async">{{ u.name }}</li>
      </ul>
    </ng-template>
    <hr />

    <!-- Custom Pipe -->
    <h3>Custom Pipe</h3>
    <label> Text: <input [(ngModel)]="text" placeholder="type here" /> </label>
    <p>Original: {{ text }}</p>
    <p>TitleCase2: {{ text | titlecase2 }}</p>
  `,
})
export class App {
  title = 'Angular';
  price = 1234.5;
  today = new Date();
  percent = 0.3495;

  time$ = interval(1000).pipe(map(() => new Date()));
  users$ = of([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }]).pipe(delay(1200));

  text = 'hey there! sahil here';
}

bootstrapApplication(App);
