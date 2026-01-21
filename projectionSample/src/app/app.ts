import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentProjectionSample } from './content-projection-sample/content-projection-sample';
import { GreetContent } from './directives/greet-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContentProjectionSample, GreetContent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('projectionSample');
}
