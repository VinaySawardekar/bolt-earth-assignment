import { TestBed } from '@angular/core/testing';

import { SnackBarToastService } from './snack-bar-toast.service';

describe('SnackBarToastService', () => {
  let service: SnackBarToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
