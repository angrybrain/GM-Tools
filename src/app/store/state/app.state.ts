import { RouterReducerState } from "@ngrx/router-store"
import { MainState, initialMainState } from './main.state'

export interface AppState {
    router?: RouterReducerState;
    main: MainState;
}

export const initialAppState: AppState = {
    main: initialMainState,
}

export function getInitialState(): AppState {
    return initialAppState;
}