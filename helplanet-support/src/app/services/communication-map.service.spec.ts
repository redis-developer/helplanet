import { TestBed } from '@angular/core/testing';

import { CommunicationMapService } from './communication-map.service';

describe('CommunicationMapService', () => {
  let service: CommunicationMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
