import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [
    `
      table {
        border-collapse: collapse;
        margin-top: 10px;
      }
      th,
      td {
        border: 1px solid #ccc;
        padding: 8px 10px;
      }
      .toolbar {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    `,
  ],
  template: `
    <h3>Basic Data Binding</h3>
    <input [value]="name" (input)="name = $any($event.target).value" placeholder="Type Your Name" />
    <p>Hello {{ name }}</p>
    <button (click)="count = count + 1">Clicked {{ count }} times</button>
    <button [disabled]="isDisabled">Can't Click me</button>
    <hr />

    <h3>Two-Way Binding (ngModel)</h3>
    <label> Name: <input [(ngModel)]="name" placeholder="Type Your Name" /> </label>

    <label style="margin-left: 12px">
      Favourite:
      <select [(ngModel)]="favourite">
        <option value="Angular">Angular</option>
        <option value="TypeScript">TypeScript</option>
        <option value="JavaScript">JavaScript</option>
      </select>
    </label>

    <p>Hello {{ name || 'friend' }}!</p>
    <p>Favourite: {{ favourite }}</p>
    <hr />

    <h3>Attribute Binding (attr. *)</h3>
    <div class="toolbar">
      <label
        >Colspan:
        <input
          type="range"
          min="1"
          max="3"
          [value]="span"
          (input)="span = +$any($event.target).value"
        />{{ span }}</label
      >
      <label>Title: <input [value]="title" (input)="title = $any($event.target).value" /></label>
    </div>

    <table [attr.title]="title">
      <thead>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>C</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td [attr.colspan]="span" style="background:#f9fbff">colspan={{ span }}</td>
          <td *ngIf="span < 2">B</td>
          <td *ngIf="span < 3">C</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class App {
  name = 'Angular';
  count = 0;
  isDisabled = true;

  favourite = 'Angular';

  span = 1;
  title = 'Data Table';
}

bootstrapApplication(App);
