import { CommonModule } from '@angular/common';
import { Component, Directive, HostBinding, HostListener, Input } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Directive({
  selector: '[w3Highlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('w3Highlight') highlightColor = 'lightyellow';
  @HostBinding('style.transition') transition = 'background-color 150ms ease-in-out';
  @HostBinding('style.backgroundColor') bg = '';

  @HostListener('mouseenter') onEnter() {
    this.bg = this.highlightColor;
  }
  @HostListener('mouseleave') onLeave() {
    this.bg = '';
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  styles: [
    `
      .box {
        padding: 10px;
        border: 1px dashed #bbb;
        border-radius: 6px;
      }
    `,
  ],
  imports: [CommonModule, HighlightDirective],
  template: `
    <!-- Basic Directives -->
    <h3>Basic Directives</h3>
    <p *ngIf="items.length > 0">We Have {{ items.length }} items</p>
    <ul>
      <li *ngFor="let item of items">
        {{ item }}
      </li>
    </ul>
    <button (click)="toggle()">Toggle Items</button>
    <hr />

    <!-- ngIf With Else  -->
    <h3>ngIf With else</h3>
    <button (click)="loggedIn = !loggedIn">
      {{ loggedIn ? 'Log Out' : 'Log in' }}
    </button>

    <ng-container *ngIf="loggedIn; else loggedOut">
      <p>Welcome back, {{ user }}!</p>
    </ng-container>

    <ng-template #loggedOut>
      <p>Please log in to continue.</p>
    </ng-template>
    <hr />

    <!-- ngIf with Then/else -->
    <h4>ngIf then/else syntax</h4>
    <button (click)="hasAccess = !hasAccess">
      Toggle Access ({{ hasAccess ? 'granted' : 'denied' }})
    </button>

    <ng-container *ngIf="hasAccess; then accessTpl; else noAccessTpl"></ng-container>

    <ng-template #accessTpl>
      <p style="color: seagreen;">Access granted</p>
    </ng-template>

    <ng-template #noAccessTpl>
      <p style="color: crimson;">Access Denied</p>
    </ng-template>
    <hr />

    <!-- Attribute Directive (Hover Highlight) -->
    <h3>Attribute Directive (highlight)</h3>
    <p>Hover the first box to see the effect:</p>
    <div class="box" [w3Highlight]="'lightyellow'">I get highlighted on Hover!</div>
    <div class="box" style="margin-top: 8px">I do not</div>
  `,
})
export class App {
  show = true;
  get items() {
    return this.show ? ['Angular', 'Components', 'Directives'] : [];
  }
  toggle() {
    this.show = !this.show;
  }

  loggedIn = false;
  user = 'Angular User';
  hasAccess = true;
}

bootstrapApplication(App);
