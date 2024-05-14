import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitizedComponent } from './sanitized.component';

describe('SanitizedComponent', () => {
  let component: SanitizedComponent;
  let fixture: ComponentFixture<SanitizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanitizedComponent]
    });
    fixture = TestBed.createComponent(SanitizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
