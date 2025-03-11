import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nhap1Guard } from './nhap-1.guard';

describe('nhap1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nhap1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
