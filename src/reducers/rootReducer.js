import {combineReducers} from 'redux';
import discard from './discardReducer';
import players from './playersReducer';
import deck from './deckReducer';

const rootReducer = combineReducers({
    discard,
    players,
    deck
});

export default rootReducer;