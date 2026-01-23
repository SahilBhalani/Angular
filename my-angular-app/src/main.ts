import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      input {
        padding: 6px 8px;
      }
    `,
  ],
  template: `
    <h3>{{ title }}</h3>
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
  `,
})
export class App {
  title = 'Templates & Interpolation';
  name = 'Angular';

  current = '';
  read(val: string) {
    this.current = val ?? '';
  }

  user: { profile?: { email?: string } } | undefined = undefined;
  toggle() {
    this.user = this.user ? undefined : { profile: { email: 'sahil@example.com' } };
  }

  ok = true;
  items = ['A', 'B', 'C'];

  type = 'info';
  msg = 'Hello';

  count = 0;
  text = '';

  user1: { name: string } | null = { name: 'Sai' };
  toggle1() {
    this.user1 = this.user1 ? null : { name: 'Sai' };
  }

  today = new Date();
  fname = 'Sahil Bhalani';
  ratio = 0.786;
}

bootstrapApplication(App);
