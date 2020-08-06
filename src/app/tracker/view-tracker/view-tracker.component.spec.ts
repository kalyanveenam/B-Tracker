import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrackerComponent } from './view-tracker.component';

describe('ViewTrackerComponent', () => {
  let component: ViewTrackerComponent;
  let fixture: ComponentFixture<ViewTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
