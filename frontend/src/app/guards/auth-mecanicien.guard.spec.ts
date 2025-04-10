import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authMecanicienGuard } from './auth-mecanicien.guard';

describe('authMecanicienGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authMecanicienGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
