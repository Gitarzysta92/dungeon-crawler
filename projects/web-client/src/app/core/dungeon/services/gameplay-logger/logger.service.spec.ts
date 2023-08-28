import { TestBed } from '@angular/core/testing';

import { GameplayLoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: GameplayLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameplayLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
