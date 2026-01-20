import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-encapsulation-sample',
  imports: [],
  templateUrl: './view-encapsulation-sample.html',
  styleUrl: './view-encapsulation-sample.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ViewEncapsulationSample {}
