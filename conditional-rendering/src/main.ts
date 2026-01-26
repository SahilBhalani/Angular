import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  styles: [
    `
      .toolbar {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
    `,
  ],
  template: `
    <!-- Basic Conditional Rendering -->
    <h3>Conditional Rendering</h3>
    <button (click)="show.set(!show())">Toggle</button>
    @if (show()) {
      <p>Now You see me!</p>
    } @else {
      <p>Now I'm hidden</p>
    }
    <hr />

    <!-- @switch -->
    <h3>Conditional Rendering with switch</h3>
    <label>
      Status:
      <select (change)="status = $any($event.target).value">
        <option value="loading">loading</option>
        <option value="success">success</option>
        <option value="error">error</option>
      </select>
    </label>

    <div [ngSwitch]="status">
      <p *ngSwitchCase="'loading'">Loading...</p>
      <p *ngSwitchCase="'success'">Success!</p>
      <p *ngSwitchCase="'error'" style="color: crimson;">Error!</p>
      <p *ngSwitchDefault>Unknown status</p>
    </div>
    <hr />

    <!-- Multi-state with @if -->
    <h3>ngIf with then/else</h3>

    <div class="toolbar">
      <button (click)="startLoading()">Start Loading</button>
      <button (click)="showError()">Set Error</button>
      <button (click)="reset()">Reset</button>
      <span style="margin-left: 8px; color: #666">loading= {{ loading }} error= {{ error }}</span>
    </div>

    <ng-container *ngIf="!loading && !error; then contentTpl; else stateTpl"></ng-container>

    <ng-template #contentTpl>
      <p>Content Loaded Successfully</p>
    </ng-template>

    <ng-template #stateTpl>
      <p *ngIf="loading">Loading...</p>
      <p *ngIf="error" style="color: crimson;">Something Went Wrong!</p>
    </ng-template>
  `,
})
export class App {
  show = signal(true);

  status = 'loading';

  loading = false;
  error = false;
  _timer: NodeJS.Timeout | number = 0;

  startLoading() {
    this.loading = true;
    this.error = false;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.loading = false;
    }, 800);
  }

  showError() {
    this.error = true;
    this.loading = false;
  }

  reset() {
    this.loading = false;
    this.error = false;
  }
}

bootstrapApplication(App);
