import { TestBed } from '@angular/core/testing';
import { ConsultationHoursService } from './consultationHours.service';

describe('ConsultationHoursService', () => {
  let service: ConsultationHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
