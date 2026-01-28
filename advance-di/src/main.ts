import { CommonModule } from '@angular/common';
import { Component, inject, InjectionToken } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

const USER_NAME = new InjectionToken<string>('USER_NAME');
const FEATURES = new InjectionToken<string[]>('FEATURES');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  template: `
    <!-- DI Multi Providers -->
    <h3>DI: Multi Providers</h3>
    <p>Features : {{ features.join(', ') }}</p>
    <hr />

    <!-- Optional 7 Multi Provides -->
    <h3>Optional & Multi Providers</h3>
    <p>Hello: {{ name || 'Anonymous' }}</p>
    <p>Features : {{ features.join(', ') || '∅' }}</p>
    <hr />
  `,
})
export class App {
  name = inject(USER_NAME, { optional: true });
  features = inject(FEATURES);
}

bootstrapApplication(App, {
  providers: [
    { provide: USER_NAME, useValue: 'Sahil Bhalani' },
    { provide: FEATURES, useValue: 'search', multi: true },
    { provide: FEATURES, useValue: 'share', multi: true },
    { provide: FEATURES, useValue: 'ai', multi: true },
  ],
});
