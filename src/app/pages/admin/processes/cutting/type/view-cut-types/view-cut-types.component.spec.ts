import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCutTypesComponent } from './view-cut-types.component';

describe('ViewCutTypesComponent', () => {
  let component: ViewCutTypesComponent;
  let fixture: ComponentFixture<ViewCutTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCutTypesComponent]
    });
    fixture = TestBed.createComponent(ViewCutTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
