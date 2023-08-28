import { TestBed } from '@angular/core/testing';

import { CommandsStackService } from './commands-stack.service';

describe('CommandsStackService', () => {
  let service: CommandsStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandsStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
