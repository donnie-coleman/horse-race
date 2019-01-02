import initialState from './initialState';
import {DRAW_HAND, STORE_SECRET, DISCARD_SECRET} from '../actions/actionTypes';

export default function players(state = initialState.players, action) {
    let newState;
    switch (action.type) {
        case DRAW_HAND:
            newState = Object.assign({}, state);
            newState[action.player].hand = action.hand;
            console.log('DRAW_HAND Action', newState);
            return newState;
        case STORE_SECRET:
            newState = Object.assign({}, state);
            let secretIdx = action.secretIdx;
            newState[action.player].secret = Object.assign({},state[action.player].hand[secretIdx]);
            newState[action.player].hand.splice(secretIdx,1);
            console.log('STORE_SECRET Action', newState);
            return newState;
        case DISCARD_SECRET:
            newState = Object.assign({}, state);
            newState[action.player].secret = null;
            console.log('DISCARD_SECRET Action', newState);
            return newState;
        default:
            return state;
    }
}