import { TestBed, inject } from '@angular/core/testing';

import { LawyersService } from './lawyers.service';

describe('LawyersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LawyersService]
    });
  });

  it('should be created', inject([LawyersService], (service: LawyersService) => {
    expect(service).toBeTruthy();
  }));
});
