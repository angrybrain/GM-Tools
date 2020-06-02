import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})

export class ReduxCharacterService extends EntityCollectionServiceBase<Character> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Characters', serviceElementsFactory);
  }
}
