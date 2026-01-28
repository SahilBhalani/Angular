import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'home-page',
  standalone: true,
  template: `<p>Home Works!</p>`,
})
export class Home {}

const routes: Routes = [{ path: '', component: Home }];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styles: [``],
  template: ` <router-outlet></router-outlet> `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient()],
});
