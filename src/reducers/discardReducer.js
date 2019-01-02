import initialState from './initialState';
import {DISCARD_CARD} from '../actions/actionTypes';

export default function discard(state = initialState.discard, action) {
    let newState;
    switch (action.type) {
        case DISCARD_CARD:
            newState = state.splice(0);
            newState.push(action.card);
            console.log('DISCARD_CARD Action', newState);
            return newState;
        default:
            return state;
    }
}