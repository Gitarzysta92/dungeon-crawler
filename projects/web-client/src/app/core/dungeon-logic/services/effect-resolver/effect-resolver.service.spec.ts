import { TestBed } from '@angular/core/testing';

import { EffectResolverService } from './effect-resolver.service';

describe('EffectResolverService', () => {
  let service: EffectResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
