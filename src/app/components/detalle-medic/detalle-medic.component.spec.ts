import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMedicComponent } from './detalle-medic.component';

describe('DetalleMedicComponent', () => {
  let component: DetalleMedicComponent;
  let fixture: ComponentFixture<DetalleMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleMedicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
