import { TestBed } from '@angular/core/testing';

import { CommandBusService } from './command-bus.service';

describe('CommandBusService', () => {
  let service: CommandBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
