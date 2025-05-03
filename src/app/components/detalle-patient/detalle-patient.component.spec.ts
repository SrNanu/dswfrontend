import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePatientComponent } from './detalle-patient.component';

describe('DetallePatientComponent', () => {
  let component: DetallePatientComponent;
  let fixture: ComponentFixture<DetallePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
