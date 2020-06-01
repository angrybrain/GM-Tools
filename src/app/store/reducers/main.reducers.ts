import { EnumMainActions, MainActions } from '../actions/main.actions'

import { initialMainState, MainState } from '../state/main.state'

export const mainReducers = (
    state = initialMainState,
    actions: MainActions
): MainState => {
    switch (actions.type) {
        case EnumMainActions.LoadCharactersRequest: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case EnumMainActions.LoadCharactersSuccess: {

            return {
                ...state,
                isLoading: false,
                isError: false,
                characters: actions.payload
            }
        }
        case EnumMainActions.LoadCharactersFailure: {
            return {
                ...state,
                isLoading: false,
                isError: actions.payload,
            }
        }
        default:
            return state;
    }
}