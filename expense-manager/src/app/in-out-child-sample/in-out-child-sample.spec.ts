import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutChildSample } from './in-out-child-sample';

describe('InOutChildSample', () => {
  let component: InOutChildSample;
  let fixture: ComponentFixture<InOutChildSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutChildSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutChildSample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
