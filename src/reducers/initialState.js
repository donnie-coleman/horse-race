function makeDeck(suit) {
    return (card, index) => {
        return {suit, card, label: labels[card-1]}
    }
}

const labels = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const hearts = numbers.map(makeDeck('H'));
const clubs = numbers.map(makeDeck('C'));
const spades = numbers.map(makeDeck('S'));
//const diamonds = numbers.map(makeDeck('D'));

let deck = [];
deck = deck.concat(hearts);
deck = deck.concat(clubs);
deck = deck.concat(spades);

let players = [{hand:[null,null,null,null,null,null], secret:null},{hand:[null,null,null,null,null,null], secret:null}];

let discard = [];

export default {
    discard,
    deck,
    players
}

