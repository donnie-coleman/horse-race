var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PHASES = {'GAME_START':'GAME_START','ROUND_START':'ROUND_START','ROUND_TURN':'ROUND_TURN','ROUND_END':'ROUND_END','GAME_END':'GAME_END'};
let previous_winner = null;
let current_phase = null;
let current_player = 0;
let players = [ {hand:[null,null,null,null,null,null], secret:null, drawn_card:null, swap_card:null, score:0},
                {hand:[null,null,null,null,null,null], secret:null, drawn_card:null, swap_card:null, score:0}];
let deck = null;
let discard = [];
let lanes = [{suit: null, cards:[null,null,null]}, {suit: null, cards:[null,null,null]}];

app.get('/init', function (req, res) {
    console.log("INITIALIZING THE GAME");
    if(!deck) {
        function makeDeck(suit) {
            return (card, index) => {
                return {suit, card, label: labels[card - 1]}
            }
        }

        function shuffle (oldArray) {
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

            return array;
        }

        const labels = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const hearts = numbers.map(makeDeck('H'));
        const clubs = numbers.map(makeDeck('C'));
        const spades = numbers.map(makeDeck('S'));
        //const diamonds = numbers.map(makeDeck('D'));

        deck = [];
        deck = deck.concat(hearts);
        deck = deck.concat(clubs);
        deck = deck.concat(spades);
        //deck = deck.concat(diamonds);

        deck = shuffle(deck);
    }

    current_player = previous_winner || 0;
    current_phase = PHASES.ROUND_START;

    res.json ({
        previous_winner,
        current_phase,
        current_player,
        players,
        deck,
        lanes
    });
});

app.post('/deal', function(req, res) {
    let player = req.body.player || 0; // todo: throw error if null
    let hand = deck.slice(0,6); // get top 6 cards
    deck.splice(0,6); // remove 6 cards from deck
    console.log(`requesting a deal for player ${JSON.stringify(player)}`);

    players[player].hand = hand;

    res.json ({
        previous_winner,
        current_phase,
        current_player,
        players,
        deck,
        lanes
    });
});

app.post('/draw', function(req, res) {
    let player = req.body.player || 0; // todo: throw error if null
    let hand = players[player].hand; // get current hand

    console.log(`requesting a draw for player ${player}`);

    if (hand.length < 6) {
        let card = deck.slice(0,1)[0]; // get top card
        deck.splice(0,1); // remove 1 card from deck

        hand.push(card); // put card in hand
    }
    else {
        console.log("CAN'T DRAW: HAND FULL");
    }

    res.json ({
        previous_winner,
        current_phase,
        current_player,
        players,
        deck,
        lanes
    });
});

app.post('/setSecretCard', function(req, res) {

});

app.post('/swapSecretCard', function(req, res) {

});

app.post('/playLaneCard', function(req, res) {

});

app.post('/swapLaneCard', function(req, res) {

});

app.post('/discard', function(req, res) {

});

module.exports = app;

