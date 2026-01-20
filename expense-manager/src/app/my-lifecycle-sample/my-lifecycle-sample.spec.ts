import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLifecycleSample } from './my-lifecycle-sample';

describe('MyLifecycleSample', () => {
  let component: MyLifecycleSample;
  let fixture: ComponentFixture<MyLifecycleSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLifecycleSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLifecycleSample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
