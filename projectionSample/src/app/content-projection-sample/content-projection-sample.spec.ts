import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectionSample } from './content-projection-sample';

describe('ContentProjectionSample', () => {
  let component: ContentProjectionSample;
  let fixture: ComponentFixture<ContentProjectionSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentProjectionSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentProjectionSample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
