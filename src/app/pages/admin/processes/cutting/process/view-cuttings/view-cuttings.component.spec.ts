import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuttingsComponent } from './view-cuttings.component';

describe('ViewCuttingsComponent', () => {
  let component: ViewCuttingsComponent;
  let fixture: ComponentFixture<ViewCuttingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCuttingsComponent]
    });
    fixture = TestBed.createComponent(ViewCuttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
