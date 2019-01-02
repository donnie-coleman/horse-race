import * as types from './actionTypes';

export const shuffle = oldArray => { // if this were doing async stuff, it should return a function that takes and calls dispatch but it's not so we just return an action
    var array = oldArray.slice(); // SUPER important
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return {type: types.SHUFFLE_DECK, deck: array};
};

export const deal = player => (dispatch, getState) => {
    let hand = getState().deck.slice(0,6); // get top 6 cards

    dispatch({type: types.DRAW_HAND, hand, player}); // update hand

    dispatch({type: types.DRAW_CARD, number: 6, player}); // update deck
};

export const draw = player => (dispatch, getState) => {
    let card = getState().deck.slice(0,1)[0]; // get top card

    let hand = getState().players[player].hand; // get current hand

    if (hand.length < 6) {
        hand.push(card); // put card in hand

        dispatch({type: types.DRAW_HAND, hand, player}); // update hand

        dispatch({type: types.DRAW_CARD, number: 1, player}); // update deck
    }
    else {
        console.log("CAN'T DRAW: HAND FULL");
        return; // todo return error
    }
};