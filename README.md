- [ ] Full (Game) State
```javascript
{
  previous_winner: player_id,
  current_phase: <game_start,round_start,round_turn,round_end,game_end>,
  current_player: player_id,
  players: [{player_id, hand:[card{5}], secret:card, drawn_card:card, swap_card:card, score}{2,3}],
  deck: [card{0,52}],
  discard: [card{0,52}],
  lanes: [{suit, cards:[{3}]}{2,3}]
}
```
- [ ] Partial (Player) State
```javascript
{
  current_phase: <game_start,round_start,round_turn,round_end,game_end>,
  current_player: player_id,
  my_player: {player_id, hand:[card{5}], secret:card, drawn_card:card, swap_card:card, score},
  players: [{player_id, hand:[bool{5}], secret:bool, drawn_card:bool, swap_card:bool, score}{2,3}],
  deck: int,
  discard: {top_card:card, size:int},
  lanes: [{suit, cards:[{3}]}{2,3}]
}
```
- [ ] NodeJS Server POC
- [ ] Client-Side Async Action Creator

**Game Start**
* Initalize Game State
  * player scores = zero
  * previous winner = null

**Round Start**
* Initialize Round State
  * Lanes Empty
  * Discard Empty
  * Shuffle Deck
  * Secret Card Empty
  * current_player = previous winner or player 1
  * Deal 5 cards to each player
  * Deal drawn card to each player
* Send State
* Player 1 chooses a secret
  * play_secret action: card, player_id
* Player 2 chooses a secret
  * play_secret action: card, player_id

**Round Turn**
* Receive Actions
  * draw then play
    * draw action: card, player_id
    * play action: card, player_id, lane_idx
  * draw then discard
    * draw action: card, player_id
    * play action: card, player_id
  * swap with lane from hand
    * swap_with_lane action: player_id, player_card, lane_idx, lane_card
  * swap with secret from hand
    * swap_with_secret action: player_id, player_card
* Determine if Round End
  * No: next player's turn
  * Yes: go to Round End phase

**Round End**
* Calculate winning lane
* Calculate losing lane+highest discard
* Determine winner
  * set Previous Winner in state
* Determine scores
  * loser(s) take the value of their secret card
* Add scores to running scores
* Determine if Game End
  * No: Go To Round Start phase
  * Yes: Go To Game End phase

**Game End**
  * Determine overall winner

**Concerns to play-test**
* Should we allow secret swap?
  * If yes, when can they play a secret?
  * What happens if they don't have a horse in the game anymore?
* How is game end triggered?
* How is overall winner calculated?
