import { TestBed } from '@angular/core/testing';

import { AttentionsService } from './attentions.service';

describe('AttentionsService', () => {
  let service: AttentionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttentionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
