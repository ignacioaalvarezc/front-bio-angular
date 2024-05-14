import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResponsiblesComponent } from './view-responsibles.component';

describe('ViewResponsiblesComponent', () => {
  let component: ViewResponsiblesComponent;
  let fixture: ComponentFixture<ViewResponsiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewResponsiblesComponent]
    });
    fixture = TestBed.createComponent(ViewResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
