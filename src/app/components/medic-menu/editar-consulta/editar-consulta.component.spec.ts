import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsultaComponent } from './editar-consulta.component';

describe('EditarConsultaComponent', () => {
  let component: EditarConsultaComponent;
  let fixture: ComponentFixture<EditarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
