import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCounterService } from './my-counter-service';

describe('MyCounterService', () => {
  let component: MyCounterService;
  let fixture: ComponentFixture<MyCounterService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCounterService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCounterService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
