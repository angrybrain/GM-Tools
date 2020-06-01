import { Action } from '@ngrx/store';
import { Character } from '../../models/character'

export enum EnumMainActions {
    LoadCharactersRequest = '[Main] Load Characters Request',
    LoadCharactersSuccess = '[Main] Load Characters Success',
    LoadCharactersFailure = '[Main] Load Characters Failure',
}

export class LoadCharactersRequest implements Action {
    public readonly type = EnumMainActions.LoadCharactersRequest;
}

export class LoadCharactersSuccess implements Action {
    public readonly type = EnumMainActions.LoadCharactersSuccess;
    constructor(public payload: Character[]) { }
}

export class LoadCharactersFailure implements Action {
    public readonly type = EnumMainActions.LoadCharactersFailure;
    constructor(public payload: Boolean) { }
}

export type MainActions = LoadCharactersRequest | LoadCharactersSuccess | LoadCharactersFailure;