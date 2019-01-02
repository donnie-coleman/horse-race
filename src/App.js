import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {shuffle, deal, draw} from './actions/deckActions';
import {storeSecret} from './actions/playersActions';

class App extends Component {
    componentDidMount() {
        this.props.shuffle(this.props.deck);
        this.props.deal(0);
        this.props.deal(1);
    }

    render() {
        return (
            <div className="App">
                <div className="field">
                    <div className="opponentHand">

                        <div className="card empty chosen"></div>

                        <div className="card empty"></div>
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                        <div className="card empty"></div>

                        <div className="card empty drawn"></div>
                    </div>
                    <div className="redTableau tableau">
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                    </div>
                    <div className="blackTableau tableau">
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                        <div className="card empty"></div>
                    </div>
                    <div className="deckTableau">
                        <div className="card deck" onClick={()=>this.props.draw(1)}>{this.props.deck.map((card)=> `${card.label}${card.suit}`).join(',')}</div>
                        <div className="card empty discards"></div>
                    </div>
                    <div className="yourHand">
                        {(this.props.players && this.props.players[1].secret) ?
                            (<div className="card chosen" key="secret_1">{`${this.props.players[1].secret.label}${this.props.players[1].secret.suit}`}</div>) :
                            (<div className="card empty chosen" key="secret_1"></div>)
                        }
                        {this.props.players && this.props.players[1].hand.map((card,idx) => {
                            if(card) {
                                return <div className="card" key={`${card.label}${card.suit}_1`} onClick={()=>this.props.storeSecret(1, idx)}>{`${card.label}${card.suit}`}</div>
                            }
                            else {
                                return <div className="card empty" key={`${idx}_1`}></div>
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    shuffle : array => dispatch(shuffle(array)), // dispatching a function
    deal: player => dispatch(deal(player)),
    draw: player => dispatch(draw(player)),
    storeSecret: (player, secret) => dispatch(storeSecret(player, secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);