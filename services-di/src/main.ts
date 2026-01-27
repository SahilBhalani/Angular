import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class CounterService {
  value = 0;
  inc() {
    this.value++;
  }
  dec() {
    this.value--;
  }
  reset() {
    this.value = 0;
  }
}

@Injectable()
export class LocalCounterService {
  id = Math.floor(Math.random() * 1000);
  value = 0;
  inc() {
    this.value++;
  }

  dec() {
    this.value--;
  }
}

@Component({
  selector: 'counter-view',
  standalone: true,
  template: `
    <p>Service #{{ svc.id }} value: {{ svc.value }}</p>
    <button (click)="svc.inc()">+1</button>
    <button (click)="svc.dec()">-1</button>
  `,
})
export class CounterView {
  constructor(public svc: LocalCounterService) {}
}

@Component({
  selector: 'panel-a',
  standalone: true,
  imports: [CommonModule, CounterView],
  providers: [LocalCounterService],
  template: `
    <h4>Panel A (own provider)</h4>
    <counter-view></counter-view>
    <counter-view></counter-view>
  `,
})
export class PanelA {}

@Component({
  selector: 'panel-b',
  standalone: true,
  imports: [CommonModule, CounterView],
  providers: [LocalCounterService],
  template: `
    <h4>Panel B (own provider)</h4>
    <counter-view></counter-view>
    <counter-view></counter-view>
  `,
})
export class PanelB {}

@Component({
  selector: 'counter-a',
  standalone: true,
  template: `
    <!-- Shared Service Across Components -->
    <h4>Counter A</h4>
    <p>Value: {{ counter.value }}</p>
    <button (click)="counter.inc()">+1</button>
    <button (click)="counter.dec()">-1</button>
  `,
})
export class counterA {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'counter-b',
  standalone: true,
  template: `
    <!-- Shared Service Across Components -->
    <h4>Counter B</h4>
    <p>Value: {{ counter.value }}</p>
    <button (click)="counter.inc()">+1</button>
    <button (click)="counter.dec()">-1</button>
  `,
})
export class counterB {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, counterA, counterB, PanelA, PanelB],
  styles: [
    `
      button {
        margin-right: 5px;
        font-weight: bold;
        margin-top: 6px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }
      h4 {
        margin: 0 0 8px;
      }
    `,
  ],
  template: `
    <!-- Service Basics -->
    <h3>Services</h3>
    <p>Counter: {{ counter.value }}</p>
    <button (click)="counter.inc()">+</button>
    <button (click)="counter.dec()">-</button>
    <button (click)="counter.reset()">Reset</button>
    <hr />

    <counter-a></counter-a>
    <counter-b></counter-b>
    <p><em>Both Components use the same CounterService instance</em></p>
    <hr />

    <!-- Component-Provided Service (Hierarchical DI) -->
    <h3>Component-Provided Service (Hierarchical DI)</h3>
    <p>
      <em>
        Each panel provides its own service instance. Counter inside the same panel share the
        instance. Different panels do not.
      </em>
    </p>
    <div class="grid">
      <panel-a></panel-a>
      <panel-b></panel-b>
    </div>
  `,
})
export class App {
  constructor(public counter: CounterService) {}
}

bootstrapApplication(App);
