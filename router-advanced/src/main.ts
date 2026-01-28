import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink, RouterOutlet } from '@angular/router';

const isLoggedIn = signal(false);

function canActivate() {
  const router = inject(Router);
  return isLoggedIn() || router.createUrlTree(['/']);
}

@Component({
  selector: 'home-page',
  standalone: true,
  template: ` <p>Home</p>
    <button (click)="login()">Login</button>`,
})
export class Home {
  login() {
    isLoggedIn.set(true);
  }
}

@Component({
  selector: 'secret-page',
  standalone: true,
  template: ` <p>Top Secret</p> `,
})
export class Secret {}

const routes = [
  { path: '', component: Home },
  { path: 'secret', component: Secret, canActivate: [canActivate] },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  styles: [``],
  template: `
    <a routerLink="/">Home</a> |
    <a routerLink="/secret">Secret</a>
    <router-outlet></router-outlet>
  `,
})
export class App {}

bootstrapApplication(App, { providers: [provideRouter(routes)] });
