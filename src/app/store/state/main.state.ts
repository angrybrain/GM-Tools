import { Character } from '../../models/character'

export interface MainState {
    isLoading: Boolean,
    isError: Boolean,
    characters: Character[];
}

export const initialMainState: MainState = {
    isLoading: false,
    isError: false,
    characters: [],
}
