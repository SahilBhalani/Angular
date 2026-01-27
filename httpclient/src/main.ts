import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  HttpClient,
  HttpResponse,
  withInterceptors,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { of } from 'rxjs';

function mockHttp(req: HttpRequest<any>, next: HttpHandlerFn) {
  if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/users')) {
    const body = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
      { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
    ];
    return of(new HttpResponse({ status: 200, body }));
  }
  return next(req);
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  template: `
    <!-- GET Requests -->
    <h3>HttpClient</h3>
    <button (click)="load()">Load Users</button>
    <p *ngIf="loading">Loading...</p>
    <p *ngIf="error" style="color:crimson">{{ error }}</p>
    <ul>
      <li *ngFor="let u of users">{{ u.name }} {{ u.email }}</li>
    </ul>
    <hr />

    <!-- POST Requests -->
  `,
})
export class App {
  http = inject(HttpClient);
  users: any[] = [];
  loading = false;
  error = '';

  load() {
    this.loading = true;
    this.error = '';
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      },
    });
  }
}

bootstrapApplication(App, { providers: [provideHttpClient(withInterceptors([mockHttp]))] });
