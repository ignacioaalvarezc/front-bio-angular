import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackagingsComponent } from './add-packagings.component';

describe('AddPackagingsComponent', () => {
  let component: AddPackagingsComponent;
  let fixture: ComponentFixture<AddPackagingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPackagingsComponent]
    });
    fixture = TestBed.createComponent(AddPackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
