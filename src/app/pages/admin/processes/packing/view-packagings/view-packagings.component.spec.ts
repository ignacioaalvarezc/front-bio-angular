import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackagingsComponent } from './view-packagings.component';

describe('ViewPackagingsComponent', () => {
  let component: ViewPackagingsComponent;
  let fixture: ComponentFixture<ViewPackagingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPackagingsComponent]
    });
    fixture = TestBed.createComponent(ViewPackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
