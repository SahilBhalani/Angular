import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEncapsulationSample } from './view-encapsulation-sample';

describe('ViewEncapsulationSample', () => {
  let component: ViewEncapsulationSample;
  let fixture: ComponentFixture<ViewEncapsulationSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEncapsulationSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEncapsulationSample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
