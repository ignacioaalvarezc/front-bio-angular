import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSizingsComponent } from './view-sizings.component';

describe('ViewSizingComponent', () => {
  let component: ViewSizingsComponent;
  let fixture: ComponentFixture<ViewSizingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSizingsComponent]
    });
    fixture = TestBed.createComponent(ViewSizingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
