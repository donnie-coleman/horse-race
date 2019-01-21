import initialState from './initialState';
import {INITIALIZE, DRAW_CARD} from '../actions/actionTypes';

export default function deck(state = initialState.deck, action) {
    let newState;
    switch (action.type) {
        case INITIALIZE:
            newState = action.deck;
            console.log('INITIALIZE Action', newState);
            return newState;
        case DRAW_CARD:
            newState = state.slice(action.number);
            console.log('DRAW_CARD Action', newState);
            return newState;
        default:
            return state;
    }
}