import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-manager',
  imports: [],
  templateUrl: './expense-manager.html',
  styleUrl: './expense-manager.scss',
})
export class ExpenseManager implements OnInit {
  title: any;
  constructor() {}
  ngOnInit(): void {
    this.title = 'Expense Entry';
  }
}
