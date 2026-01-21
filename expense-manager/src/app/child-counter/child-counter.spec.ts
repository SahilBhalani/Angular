import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCounter } from './child-counter';

describe('ChildCounter', () => {
  let component: ChildCounter;
  let fixture: ComponentFixture<ChildCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
