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
      .box {
        border: 2px solid #ccc;
        margin-top: 12px;
        border-radius: 6px;
        transition: all 0.15s ease-in-out;
      }
      .fancy {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        background: #f9fbff;
      }
      .rounded {
        border-radius: 14px;
      }
      .toolbar {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }
      .toolbar label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    `,
  ],
  template: `
    <!-- Basic Styling -->
    <!-- <div class="toolbar">
      <button (click)="toggleHighlight()">Toggle Highlight</button>
      <button (click)="toggleBig()">Toggle Big</button>
      <button (click)="setColor('crimson')">Crimson</button>
      <button (click)="setColor('seagreen')">Green</button>
      <button (click)="setColor('royalblue')">Blue</button>
    </div>

    <div
      class="box"
      [class.highlight]="highlight"
      [ngClass]="{ big: big }"
      [style.color]="color"
      [style.borderColor]="color"
    >
      Styled box
    </div>
    <hr /> -->

    <!-- Dynamic Styling -->
    <h3>Dynamic Styling</h3>
    <div class="toolbar">
      <label><input type="checkbox" [(ngModel)]="fancy" />Fancy</label>
      <label><input type="checkbox" [(ngModel)]="rounded" />Rounded</label>
      <label>Color <input type="color" [(ngModel)]="color" /></label>
      <label
        >Padding <input type="range" min="0" max="50" [(ngModel)]="padding" />{{ padding }}px</label
      >
      <label
        >Font Size <input type="range" min="12" max="50" [(ngModel)]="fontSize" />{{
          fontSize
        }}px</label
      >
    </div>

    <div
      class="box"
      [ngClass]="{ fancy: fancy, rounded: rounded }"
      [ngStyle]="{
        color: color,
        borderColor: color,
        padding: padding + 'px',
        fontSize: fontSize + 'px',
      }"
    >
      Styled Box
    </div>
  `,
})
export class App {
  highlight = false;
  big = false;
  // color = 'royalblue';

  toggleHighlight() {
    this.highlight = !this.highlight;
  }
  toggleBig() {
    this.big = !this.big;
  }
  setColor(c: any) {
    this.color = c;
  }

  fancy = true;
  rounded = false;
  color = '#4169e1';
  padding = 12;
  fontSize = 18;
}

bootstrapApplication(App);
