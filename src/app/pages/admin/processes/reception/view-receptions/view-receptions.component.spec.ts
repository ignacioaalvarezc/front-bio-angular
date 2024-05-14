import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceptionsComponent } from './view-receptions.component';

describe('ViewReceptionsComponent', () => {
  let component: ViewReceptionsComponent;
  let fixture: ComponentFixture<ViewReceptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceptionsComponent]
    });
    fixture = TestBed.createComponent(ViewReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
