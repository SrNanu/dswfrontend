import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosMedicosPacienteComponent } from './modal-datos-medicos-paciente.component';

describe('ModalDatosMedicosPacienteComponent', () => {
  let component: ModalDatosMedicosPacienteComponent;
  let fixture: ComponentFixture<ModalDatosMedicosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDatosMedicosPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDatosMedicosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
