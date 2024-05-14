import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSanitizedsComponent } from './view-sanitizeds.component';

describe('ViewSanitizedsComponent', () => {
  let component: ViewSanitizedsComponent;
  let fixture: ComponentFixture<ViewSanitizedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSanitizedsComponent]
    });
    fixture = TestBed.createComponent(ViewSanitizedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
