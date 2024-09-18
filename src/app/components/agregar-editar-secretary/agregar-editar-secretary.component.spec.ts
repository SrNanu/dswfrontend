import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarSecretaryComponent } from './agregar-editar-secretary.component';

describe('AgregarEditarSecretaryComponent', () => {
  let component: AgregarEditarSecretaryComponent;
  let fixture: ComponentFixture<AgregarEditarSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarSecretaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
