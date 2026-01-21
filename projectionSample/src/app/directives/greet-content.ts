import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appGreetContent]',
})
export class GreetContent {
  constructor(public template: TemplateRef<any>) {}
}
