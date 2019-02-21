import { TestBed, inject } from '@angular/core/testing';

import { AdminMastersService } from './admin-masters.service';

describe('AdminMastersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminMastersService]
    });
  });

  it('should be created', inject([AdminMastersService], (service: AdminMastersService) => {
    expect(service).toBeTruthy();
  }));
});
