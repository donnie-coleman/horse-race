- [ ] Full (Game) State
```javascript
{
  current_phase: <game_start,round_start,round_turn,round_end,game_end>,
  current_player: player_id,
  players: [{player_id, hand:[card{5}], secret:card, drawn_card:card, swap_card:card, score}{2,3}],
  deck: [cards],
  discard: [cards],
  lane: [{suit, cards:[card{3}]]]
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
  discard: int,
  lane: [{suit, cards:[{3}]}{2,3}]
}
```
- [ ] NodeJS Server POC
- [ ] Client-Side Async Action Creator

**Game Start**
* Initalize State

**Round Start**
* Shuffle Deck
* Deal 5 cards to each player
* Deal drawn card to each player
* Player 1 chooses a secret
* Player 2 chooses a secret

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
* Receive Turn Over Action
* Determine if Round Over
* Next Turn

**Round End**
* Calculate winning lane
* Calculate losing lane+highest discard
* Determine winner
* Determine scores
* Add scores running score
* Determine if Game Over
  * determine overall winner
  
**Concerns to play-test**
* Should we allow secret swap?
  * If yes, when can they play a secret?
  * What happens if they don't have a horse in the game anymore?
* How is game end triggered?
* How is overall winner calculated?
