import { TestBed } from '@angular/core/testing';

import { NhapService } from './nhap.service';

describe('NhapService', () => {
  let service: NhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
