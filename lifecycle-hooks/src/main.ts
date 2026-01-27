import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'child-cmp2',
  standalone: true,
  template: `
    <p>Child received: {{ text }}</p>
    <p>Last change: {{ lastPrev || 'âˆ…' }} -> {{ lastCurr || 'âˆ…' }}</p>
  `,
})
export class Child2 {
  @Input() text = '';
  lastPrev = null;
  lastCurr = null;
  ngOnChanges(changes: any) {
    const c = changes['text'];
    if (c) {
      this.lastPrev = c.previousValue ?? null;
      this.lastCurr = c.currentValue ?? null;
    }
  }
}

@Component({
  selector: 'child-cmp',
  standalone: true,
  template: `<p>Child Active</p>`,
})
export class Child implements OnInit, OnDestroy {
  intervalId: any;
  ngOnInit() {
    console.log('Child ngOnInit');
    this.intervalId = setInterval(() => console.log('Child Active'), 1000);
  }

  ngOnDestroy() {
    console.log('Child ngOnDestroy');
    clearInterval(this.intervalId);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Child, Child2],
  styles: [
    `
      .panel {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: center;
      }
      input {
        padding: 6px 8px;
      }
    `,
  ],
  template: `
    <!-- Lifecycle Hooks -->
    <h3>Lifecycle Hooks</h3>
    <button (click)="toggle()">Toggle Child</button>
    <child-cmp *ngIf="show"></child-cmp>
    <hr />

    <h3>OnChanges</h3>
    <label>Text: <input #i (input)="text = i.value" placeholder="Type Here..." /></label>
    <child-cmp2 [text]="text"></child-cmp2>
    <hr />

    <!-- ViewChild & AfterViewInit -->
    <h3>ViewChild & AfterViewInit</h3>
    <div #panel class="panel">
      <div class="row">
        <input #box type="text" placeholder="Focused after view init" />
        <button (click)="measure()">Measure</button>
      </div>
      <p>Panel Size: {{ size }}</p>
    </div>
  `,
})
export class App implements AfterViewInit {
  show = true;
  toggle() {
    this.show = !this.show;
  }

  text = '';

  @ViewChild('box') box: any;
  @ViewChild('panel') panel: any;
  size = '';

  ngAfterViewInit() {
    setTimeout(() => {
      this.box?.nativeElement?.focus?.();
      this.measure();
    });
  }

  measure() {
    const el = this.panel?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    this.size = `${Math.round(rect.width)}Ã—${Math.round(rect.height)}`;
  }
}

bootstrapApplication(App);
