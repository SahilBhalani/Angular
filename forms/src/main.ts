import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styles: [
    `
      form {
        display: grid;
        gap: 10px;
        max-width: 360px;
      }
      label {
        display: grid;
        gap: 6px;
      }
      small {
        color: crimson;
      }
    `,
  ],

  template: `
    <!-- Template-driven Forms  -->
    <h3>Template Driven Form</h3>
    <form #f="ngForm" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input name="name" [(ngModel)]="name" placeholder="Enter Your Name" />
      </label>
      <button type="submit">Submit</button>
    </form>
    <p>Value: {{ name }}</p>
    <p *ngIf="submitted">Submitted!</p>
    <hr />

    <!-- Forms Validation -->
    <h3>Forms Validation</h3>
    <form #fo="ngForm" (ngSubmit)="onSubmit1()" novalidate>
      <label>
        Name:
        <input name="name" [(ngModel)]="model.name" required minlength="3" #name="ngModel" />
      </label>
      <div
        *ngIf="name.invalid && (name.dirty || name.touched || submitted1)"
        style="color: crimson;"
      >
        <small *ngIf="name.errors && name.errors['required']">Name is Required</small>
        <small *ngIf="name.errors && name.errors['minlength']"
          >Name must be atleast 3 characters
        </small>
      </div>

      <label>
        Email:
        <input name="email" [(ngModel)]="model.email" email required #email="ngModel" />
      </label>

      <div
        *ngIf="email.invalid && (email.dirty || email.touched || submitted1)"
        style="color: crimson"
      >
        <small *ngIf="email.errors && email.errors['required']">Email Is Required</small>
        <small *ngIf="email.errors && email.errors['email']">Email must be Valid</small>
      </div>

      <button type="submit" [disabled]="fo.invalid">Submit</button>
    </form>

    <p *ngIf="submitted1">Submitted: {{ model | json }}</p>
    <hr />

    <!-- Reactive Forms -->
    <h3>Reactive Forms</h3>
    <form [formGroup]="form" (ngSubmit)="OnSubmit2()">
      <label>
        Name:
        <input formControlName="name" placeholder="Your Name" />
        <small
          *ngIf="
            form.controls.name.invalid &&
            (form.controls.name.dirty || form.controls.name.touched || submitted2)
          "
        >
          <span *ngIf="form.controls.name.errors?.['required']">Name is Required</span>
          <span *ngIf="form.controls.name.errors?.['minlength']">Min 3 Characters</span>
        </small>
      </label>

      <label>
        Email
        <input formControlName="email" placeholder="you@example.com" />
        <small
          *ngIf="
            form.controls.email.invalid &&
            (form.controls.email.dirty || form.controls.email.touched || submitted2)
          "
        >
          <span *ngIf="form.controls.email.errors?.['required']">Email is required.</span>
          <span *ngIf="form.controls.email.errors?.['email']">Email must be valid.</span>
        </small>
      </label>

      <label style="align-items: center; grid-auto-flow: column; justify-content: start">
        <input type="checkbox" formControlName="newsletter" /> Subscribe to newsletter
      </label>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>

    <p>Status: {{ form.status }}</p>
    <p>Value: {{ form.value | json }}</p>
    <p *ngIf="submitted2" style="color: seagreen;">Submitted!!</p>
  `,
})
export class App {
  name = '';
  submitted = false;
  onSubmit() {
    this.submitted = true;
  }

  model = { name: '', email: '' };
  submitted1 = false;
  onSubmit1() {
    this.submitted1 = true;
  }

  fb = new FormBuilder();
  submitted2 = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    newsletter: [false],
  });

  OnSubmit2() {
    this.submitted2 = true;
  }
}

bootstrapApplication(App);
