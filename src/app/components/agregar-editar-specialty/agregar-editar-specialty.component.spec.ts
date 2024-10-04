import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarSpecialtyComponent } from './agregar-editar-specialty.component';

describe('AgregarEditarSpecialtyComponent', () => {
  let component: AgregarEditarSpecialtyComponent;
  let fixture: ComponentFixture<AgregarEditarSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarSpecialtyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
