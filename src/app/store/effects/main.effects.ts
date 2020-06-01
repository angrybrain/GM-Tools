import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { EnumMainActions, LoadCharactersRequest, LoadCharactersSuccess, LoadCharactersFailure } from '../actions/main.actions';
import { CharacterService } from '../../services/character.service';

@Injectable()
export class MainEffects {

    @Effect()
    loadCharacters$ = this._actions$.pipe(
        ofType<LoadCharactersRequest>(EnumMainActions.LoadCharactersRequest),
        switchMap(() => this._characterService.getAll()),
        switchMap((characters: any) => of(new LoadCharactersSuccess(characters))),
        catchError(() => of(new LoadCharactersFailure(true))),
    );

    constructor(
        private _characterService: CharacterService,
        private _actions$: Actions,
        private _store: Store<AppState>
    ) { }
}