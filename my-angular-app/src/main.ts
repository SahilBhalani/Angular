import { bootstrapApplication } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// type Item = { id: number; name: string };

@Component({
  selector: 'hello-comp',
  standalone: true,
  template: ` <p>Hello {{ name }} from child!</p> `,
})
export class HelloComponent {
  @Input() name = '';
}

@Component({
  selector: 'counter-button',
  standalone: true,
  template: ` <button (click)="inc()">Clicked {{ count }} times</button> `,
})
export class CounterButton {
  @Input() step = 1;
  @Output()
  clicked = new EventEmitter();
  count = 0;
  inc() {
    this.count += this.step;
    this.clicked.emit(this.count);
  }
}

@Component({
  selector: 'w3-card',
  standalone: true,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 12px;
        max-width: 360px;
      }
      .card-header {
        font-weight: 600;
        margin-bottom: 6px;
      }
      .card-body {
        color: #333;
      }
    `,
  ],
  template: `
    <div class="card">
      <div class="card-header"><ng-content select="[card-title]"></ng-content></div>
      <div class="card-body"><ng-content></ng-content></div>
    </div>
  `,
})
export class CardComponent {}
@Component({
  selector: 'demo',
  standalone: true,
  template: `<p>Lifecycle</p>`,
})
export class Demo implements OnInit, OnDestroy {
  intervalid: any;
  ngOnInit() {
    this.intervalid = setInterval(() => {
      /* */
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalid);
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelloComponent, CounterButton, CardComponent, Demo],
  template: `
    <h3>Parent Component</h3>
    <hello-comp [name]="user"></hello-comp>
    <hr />
    <h3>Component Output</h3>
    <counter-button [step]="2" (clicked)="onChildClicked($event)"></counter-button>
    <p>Parent Received: {{ lastCount }}</p>

    <h3>Content Projection (ng-content)</h3>
    <w3-card>
      <span card-title>Welcome</span>
      <p>Project any markup into a reusable shell component.</p>
    </w3-card>
    <br />

    <w3-card>
      <span card-title>Another Card</span>
      <ul>
        <li>Works with lists</li>
        <li>Images, buttons, etc.</li>
      </ul>
    </w3-card>
    <!-- <h3>{{ title }}</h3>
    <p>Hello {{ name }}</p>
    <p>2 + 3 = {{ 2 + 3 }}</p>
    <p>Upper: {{ name.toUpperCase() }}</p>
    <hr />

    <h3>Template Reference Variables</h3>
    <div class="toolbar">
      <input #box type="text" placeholder="Type something" />
      <button (click)="read(box.value)">Read Value</button>
      <button (click)="box.focus()">Focus Input</button>
      <span style="margin-left:8px;color:#666">length={{ box.value?.length || 0 }}</span>
    </div>
    <p>Current : {{ current || '(empty)' }}</p>
    <hr />

    <h3>Null-Safe Navigation</h3>
    <button (click)="toggle()">Toggle user</button>
    <p>Email: {{ user?.profile?.email || '(none)' }}</p>
    <hr />

    <h3>Structural Directives Micro-syntax</h3>
    <button (click)="ok = !ok">Toggle</button>
    <div *ngIf="ok; else other">OK</div>
    <ng-template #other>Not OK</ng-template>
    <ul>
      <li *ngFor="let item of items; index as i">{{ i }} - {{ item }}</li>
    </ul>

    <h3>Templates with ngTemplateOutlet</h3>

    <label>
      Type:
      <select (change)="type = $any($event.target).value">
        <option value="info">info</option>
        <option value="warning">warning</option>
        <option value="success">success</option>
      </select>
    </label>

    <label> Message: <input (input)="msg = $any($event.target).value" [value]="msg" /> </label>

    <ng-container
      [ngTemplateOutlet]="type === 'info' ? infoTpl : type === 'warning' ? warnTpl : successTpl"
      [ngTemplateOutletContext]="{ $implicit: msg }"
    >
    </ng-container>

    <ng-template #infoTpl let-text>
      <p style="color: royalblue">Info: {{ text }}</p>
    </ng-template>
    <ng-template #warnTpl let-text>
      <p style="color: darkorange">Warning: {{ text }}</p>
    </ng-template>
    <ng-template #successTpl let-text>
      <p style="color: seagreen">Success: {{ text }}</p>
    </ng-template>
    <hr />

    <h3>Template Statements and $event</h3>
    <button (click)="count = count + 1">Increment</button>
    <input placeholder="Type" (input)="text = $any($event.target).value" [value]="text" />
    <p>Count: {{ count }}</p>
    <p>Text: {{ text || '(empty)' }}</p>
    <hr />

    <h3>*ngIf with as</h3>
    <button (click)="toggle1()">Toggle User</button>
    <p *ngIf="user1 as u; else empty">Hello {{ u.name }}!</p>
    <ng-template #empty>No user</ng-template>
    <hr />

    <h3>Built-in Pipes</h3>
    <p>Today : {{ today | date: 'yyyy-MM-dd' }}</p>
    <p>Name: {{ fname | uppercase }}</p>
    <p>Chained : {{ ratio | percent: '1.0-2' | uppercase }}</p>
    <hr />

    <h3>Attribute binding (attr.)</h3>
    <button [attr.aria-label]="label" (click)="toggleA()">Toggle Label</button>
    <table border="1" style="margin-top:8px">
      <tr>
        <th>A</th>
        <th>B</th>
        <th>C</th>
      </tr>
      <tr>
        <td [attr.colspan]="wide ? 2 : 1">Row 1</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
    </table>
    <hr />

    <h3>TrackBy with *ngFor</h3>
    <button (click)="shuffle()">Shuffle</button>
    <ul>
      <li *ngFor="let it of itemss; trackBy: trackById">{{ it.id }} - {{ it.name }}</li>
    </ul> -->
  `,
})
export class App {
  // title = 'Templates & Interpolation';
  // name = 'Angular';

  // current = '';
  // read(val: string) {
  //   this.current = val ?? '';
  // }

  // user: { profile?: { email?: string } } | undefined = undefined;
  // toggle() {
  //   this.user = this.user ? undefined : { profile: { email: 'sahil@example.com' } };
  // }

  // ok = true;
  // items = ['A', 'B', 'C'];

  // type = 'info';
  // msg = 'Hello';

  // count = 0;
  // text = '';

  // user1: { name: string } | null = { name: 'Sai' };
  // toggle1() {
  //   this.user1 = this.user1 ? null : { name: 'Sai' };
  // }

  // today = new Date();
  // fname = 'Sahil Bhalani';
  // ratio = 0.79;

  // wide = true;
  // get label() {
  //   return this.wide ? 'Table is wide' : 'Table is narrow';
  // }
  // toggleA() {
  //   this.wide = !this.wide;
  // }

  // itemss: Item[] = [
  //   { id: 1, name: 'Alpha' },
  //   { id: 2, name: 'Beta' },
  //   { id: 3, name: 'Gamma' },
  // ];
  // shuffle() {
  //   this.itemss = [...this.itemss].reverse();
  // }
  // trackById(_i: number, it: Item) {
  //   return it.id;
  // }

  user = 'Angular';
  lastCount = 0;
  onChildClicked(n: number): void {
    this.lastCount = n;
  }
}

bootstrapApplication(App);
