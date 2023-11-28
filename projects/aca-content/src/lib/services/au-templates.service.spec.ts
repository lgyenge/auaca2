import { TestBed } from '@angular/core/testing';

import { AuTemplatesService } from './au-templates.service';

describe('AuTemplatesService', () => {
  let service: AuTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
