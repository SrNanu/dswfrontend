import { TestBed } from '@angular/core/testing';

import { SecretaryService } from './secretary.service';

describe('SecretaryService', () => {
  let service: SecretaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
