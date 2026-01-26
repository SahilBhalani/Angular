import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background: #f7f7f7;
      }
      .controls {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }
      input {
        padding: 6px 8px;
      }
    `,
  ],
  template: `
    <!-- List With @trackBy -->
    <h3>List with trackBy</h3>
    <ul>
      <li *ngFor="let item of items1; index as i; trackBy: trackById">
        {{ i + 1 }}. {{ item.name }} (id: {{ item.id }})
      </li>
    </ul>
    <button (click)="renameFirst()">Rename first</button>
    <button (click)="shuffle()">Shuffle</button>
    <button (click)="add()">Add item</button>
    <hr />

    <!-- Filter & Sort -->
    <h3>Filter & Sort</h3>
    <div class="controls">
      <label>Search: <input #q (input)="query = q.value" placeholder="Type To Filter..." /></label>
      <button (click)="setSort('name')">Sort By Name</button>
      <button (click)="setSort('price')">Sort By Price</button>
      <button (click)="toggleDir()">{{ sortDir === 1 ? 'Asc' : 'Desc' }}</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th style="width: 140px;">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of view">
          <td>{{ p.name }}</td>
          <td>{{ p.price | currency: 'USD' }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class App {
  items1 = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
  ];
  nextId = 4;

  trackById(_index: any, item: { id: any }) {
    return item.id;
  }

  renameFirst() {
    this.items1 = this.items1.map((it, i) => (i === 0 ? { ...it, name: it.name + ' *' } : it));
  }

  shuffle() {
    const arr = [...this.items1];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.items1 = arr;
  }

  add() {
    this.items1 = [...this.items1, { id: this.nextId++, name: 'New ' + Date.now() }];
  }

  // ------------------
  items = [
    { name: 'Angular', price: 3 },
    { name: 'React', price: 4 },
    { name: 'Vue', price: 5 },
    { name: 'Svelte', price: 5.5 },
    { name: 'Solid', price: 2.5 },
    { name: 'Lit', price: 9 },
  ];
  query = '';
  sortKey = 'name';
  sortDir = 1; //1 asc , -1 desc

  get view() {
    const q = this.query.toLowerCase();
    const filtered = this.items.filter((it) => it.name.toLowerCase().includes(q));
    const dir = this.sortDir;
    const key = this.sortKey;

    return [...filtered].sort((a, b) => {
      const av = (a as any)[key];
      const bv = (b as any)[key];
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
    });
  }

  setSort(key: string) {
    if (this.sortKey === key) {
      this.toggleDir();
    } else {
      this.sortKey = key;
    }
  }

  toggleDir() {
    this.sortDir = this.sortDir === 1 ? -1 : 1;
  }
}

bootstrapApplication(App);
