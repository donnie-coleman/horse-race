import * as types from './actionTypes';

export const storeSecret = (player, number) => (dispatch, getState) => {
    // todo: check for existing secret
    // todo: check for number of cards < 6

    dispatch({type: types.STORE_SECRET, player, secretIdx: number});

};


export const discardSecret = (player) => {
    return {type: types.DISCARD_SECRET, player}
};