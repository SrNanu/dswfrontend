import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtorgarTurnoComponent } from './otorgar-turno.component';

describe('OtorgarTurnoComponent', () => {
  let component: OtorgarTurnoComponent;
  let fixture: ComponentFixture<OtorgarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtorgarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtorgarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
