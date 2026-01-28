import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  animations: [
    trigger('openClose', [
      state('open', style({ height: '80px', opacity: 1 })),
      state('close', style({ height: '0px', opacity: 0 })),
      transition('open <=> close', [animate('600ms ease-in-out')]),
    ]),
  ],
  template: `
    <!-- Animations -->
    <h3>Animations</h3>
    <button (click)="open = !open">Toggle</button>
    <div
      [@openClose]="open ? 'open' : 'close'"
      style="overflow:hidden; background: #e3f2fd; margin-top: 8px"
    >
      Panel
    </div>
  `,
})
export class App {
  open = true;
}

bootstrapApplication(App, { providers: [provideAnimations()] });
