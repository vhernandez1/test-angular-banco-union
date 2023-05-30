import { TestBed } from '@angular/core/testing';

import { DesempenhoService } from './desempenho.service';

describe('DesempenhoService', () => {
  let service: DesempenhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesempenhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
