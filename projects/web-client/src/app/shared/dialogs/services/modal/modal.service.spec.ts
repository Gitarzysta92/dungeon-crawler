import { TestBed } from '@angular/core/testing';

import { ModalService2 } from './modal.service';

describe('ModalService', () => {
  let service: ModalService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
