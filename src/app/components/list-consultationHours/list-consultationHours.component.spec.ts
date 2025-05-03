import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultationHoursComponent } from './list-consultationHours.component';  

describe('ListSpecialtyComponent', () => {
  let component: ListConsultationHoursComponent;
  let fixture: ComponentFixture<ListConsultationHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListConsultationHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListConsultationHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
