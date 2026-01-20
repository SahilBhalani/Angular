import {
  Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-my-lifecycle-sample',
  imports: [],
  templateUrl: './my-lifecycle-sample.html',
  styleUrl: './my-lifecycle-sample.scss',
})
export class MyLifecycleSample implements OnChanges, OnInit {
  ngOnChanges() {
    console.log('Change detection');
  }

  ngOnInit() {
    console.log('Initialization of component / directive');
  }

  ngDoCheck() {
    console.log('Custom change detection');
  }

  ngAfterContentInit() {
    console.log('Content initialization');
  }

  ngAfterContentChecked() {
    console.log('Checking changes in content');
  }

  ngAfterViewInit() {
    console.log('View initialization');
  }

  ngAfterViewChecked() {
    console.log('Checking changes in views');
  }

  ngOnDestroy() {
    console.log('Destruction of component / directive');
  }
}
