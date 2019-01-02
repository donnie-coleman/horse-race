import * as types from './actionTypes';

export const discard = card => {
    return {type: types.DISCARD_CARD, card}
};