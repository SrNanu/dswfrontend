import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicComponent } from './add-edit-medic.component';

describe('AddEditMedicComponent', () => {
  let component: AddEditMedicComponent;
  let fixture: ComponentFixture<AddEditMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditMedicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
