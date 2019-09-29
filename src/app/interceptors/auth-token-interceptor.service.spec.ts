import { TestBed } from '@angular/core/testing';

import { AuthTokenInterceptorService } from './auth-token-interceptor.service';

describe('ApiInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthTokenInterceptorService = TestBed.get(AuthTokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
