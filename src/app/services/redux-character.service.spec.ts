import { TestBed } from '@angular/core/testing';

import { ReduxCharacterService } from './redux-character.service';

describe('ReduxCharacterService', () => {
  let service: ReduxCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReduxCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
