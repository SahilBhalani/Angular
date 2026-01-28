import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  styles: [``],
  template: `
    <!-- Advance Reactive Form -->
    <h3>Advanced Reactive Form</h3>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input placeholder="text" formControlName="name" />
      <div formArrayName="tags">
        <div *ngFor="let t of tags.controls; let i = index" [formGroupName]="i">
          <input placeholder="Tag" formControlName="label" />
        </div>
      </div>
      <button type="button" (click)="addTag()">Add Tag</button>
      <button type="submit">Submit</button>
    </form>
    <pre>{{ form.value | json }}</pre>
  `,
})
export class App {
  fb = new FormBuilder();
  form = this.fb.group({
    name: ['', Validators.required],
    tags: this.fb.array([this.fb.group({ label: ['Angular'] })]),
  });
  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }
  addTag() {
    this.tags.push(this.fb.group({ label: [''] }));
  }
  submit() {
    alert(JSON.stringify(this.form.value));
  }
}

bootstrapApplication(App);
