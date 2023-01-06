import { TestBed } from '@angular/core/testing';

import { GestionDoctorService } from './gestion-doctor.service';

describe('GestionDoctorService', () => {
  let service: GestionDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
