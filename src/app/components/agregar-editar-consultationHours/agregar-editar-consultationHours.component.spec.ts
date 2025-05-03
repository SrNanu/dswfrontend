import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarConsultationHoursComponent } from './agregar-editar-consultationHours.component';

describe('AgregarEditarConsultationHoursComponent', () => {
  let component: AgregarEditarConsultationHoursComponent;
  let fixture: ComponentFixture<AgregarEditarConsultationHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarConsultationHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarConsultationHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
