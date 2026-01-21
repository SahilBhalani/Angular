import { Component, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetContent } from '../directives/greet-content';

@Component({
  selector: 'app-content-projection-sample',
  imports: [CommonModule, GreetContent],
  templateUrl: './content-projection-sample.html',
  styleUrl: './content-projection-sample.scss',
})
export class ContentProjectionSample {
  show = true;
  @ContentChild(GreetContent) greet!: GreetContent;
}
