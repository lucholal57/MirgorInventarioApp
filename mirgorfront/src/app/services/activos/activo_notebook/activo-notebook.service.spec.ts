import { TestBed } from '@angular/core/testing';

import { ActivoNotebookService } from './activo-notebook.service';

describe('ActivoNotebookService', () => {
  let service: ActivoNotebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivoNotebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
