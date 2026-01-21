import { Component } from '@angular/core';
import { Child } from './child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {}
