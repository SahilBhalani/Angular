import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouterOutlet,
  provideRouter,
  RouterLink,
  withHashLocation,
  RouterLinkActive,
  ActivatedRoute,
  Router,
} from '@angular/router';

let loggedIn = false;

export const authGuard = () => {
  if (loggedIn) return true;
  const router = inject(Router);
  return router.createUrlTree(['/']);
};

@Component({
  standalone: true,
  template: `<p>Home (public).</p>
    <p>Login to access protected route</p> `,
})
export class Home {}

@Component({
  standalone: true,
  template: `<p>Protected works! You are logged In.</p>`,
})
export class Protected {}

@Component({
  selector: 'product-cmp',
  standalone: true,
  template: `<p>Product ID: {{ id }}</p>`,
})
export class Product implements OnInit {
  id = '';
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  styles: [
    `
      nav a {
        margin-right: 6px;
      }
      .active {
        font-weight: bold;
        color: seagreen;
      }
      .status {
        margin-left: 8px;
        font-weight: 600;
      }
    `,
  ],
  template: `
    <!-- Basic Routing -->
    <h3>Router</h3>
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/about">About</a>
    </nav>
    <hr />

    <!-- Router Params  -->
    <h3>Router Params</h3>
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/product/1" routerLinkActive="active">Product 1</a> |
      <a routerLink="/product/2" routerLinkActive="active">Product 2</a>
    </nav>
    <hr />

    <!-- Active Links  -->
    <h3>Active Links (routerLinkActive)</h3>
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
        >Home</a
      >
      <a routerLink="/about" routerLinkActive="active">About</a>
    </nav>
    <hr />

    <!-- Lazy Loading -->
    <h3>Lazy-loaded Component (loadComponent)</h3>
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About (lazy)</a>
    </nav>
    <hr />

    <!-- Route Guard (canActivate) -->
    <h3>Route Guard (canActivate)</h3>
    <div class="toolbar">
      <button (click)="toggle()">{{ loggedIn ? 'Log Out' : 'Log in' }}</button>
      <span class="status">Status: {{ loggedIn ? 'Logged In' : 'Logged Out' }}</span>
    </div>
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/protected">Protected</a>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class App {
  get loggedIn() {
    return loggedIn;
  }
  toggle() {
    loggedIn = !loggedIn;
  }
}

@Component({
  selector: 'about-view',
  standalone: true,
  template: `<p>About Works (lazy)!</p>`,
})
export class About {}

const routes = [
  { path: '', component: Home },
  { path: 'about', loadComponent: () => Promise.resolve(About) },
  { path: 'product/:id', component: Product },
  { path: 'protected', component: Protected, canActive: [authGuard] },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes, withHashLocation())],
});
