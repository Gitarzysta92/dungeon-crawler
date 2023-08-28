import { TestBed } from '@angular/core/testing';

import { CommandsQueueService } from './commands-queue.service';

describe('CommandsQueueService', () => {
  let service: CommandsQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandsQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
