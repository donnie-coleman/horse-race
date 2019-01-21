import * as types from './actionTypes';

export const init = player => (dispatch, getState) => {
    return fetch("http://localhost:3030/init")
        .then(() => dispatch(deal(0)))
        .then(() => dispatch(deal(1)));
};

export const deal = player => (dispatch, getState) => {
    console.log(`dealing cards to player ${player}`);
    return fetch("http://localhost:3030/deal", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({player})}).then(resp => resp.json()).then(resp => {
        dispatch({type: types.DRAW_HAND, hand: resp.players[player].hand, player}); // update hand

        dispatch({type: types.DRAW_CARD, number: 6, player}); // update deck
    });
};

export const draw = player => (dispatch, getState) => {
    return fetch("http://localhost:3030/draw", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({player})}).then(resp => resp.json()).then(resp => {
        dispatch({type: types.DRAW_HAND, hand: resp.players[player].hand, player}); // update hand

        dispatch({type: types.DRAW_CARD, number: 1, player}); // update deck
    });
};