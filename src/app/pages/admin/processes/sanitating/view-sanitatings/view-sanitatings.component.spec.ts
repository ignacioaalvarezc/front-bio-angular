import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSanitatingsComponent } from './view-sanitatings.component';

describe('ViewSanitatingsComponent', () => {
  let component: ViewSanitatingsComponent;
  let fixture: ComponentFixture<ViewSanitatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSanitatingsComponent]
    });
    fixture = TestBed.createComponent(ViewSanitatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
