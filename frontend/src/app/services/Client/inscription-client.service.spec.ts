import { TestBed } from '@angular/core/testing';

import { InscriptionClientService } from './inscription-client.service';

describe('InscriptionClientService', () => {
  let service: InscriptionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
