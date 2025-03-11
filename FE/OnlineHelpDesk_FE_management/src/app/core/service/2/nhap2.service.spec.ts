import { TestBed } from '@angular/core/testing';

import { Nhap2Service } from './nhap2.service';

describe('Nhap2Service', () => {
  let service: Nhap2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nhap2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
