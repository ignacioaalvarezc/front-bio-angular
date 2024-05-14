import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingsComponent } from './view-pendings.component';

describe('ViewPendingsComponent', () => {
  let component: ViewPendingsComponent;
  let fixture: ComponentFixture<ViewPendingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPendingsComponent]
    });
    fixture = TestBed.createComponent(ViewPendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
