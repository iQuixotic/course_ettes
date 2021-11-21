import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSubscribedDecks, getOwnedDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'

class MyDecksPg extends Component {
    state = {
        
    }
    updateToDeckReviewPg = (e) => {
        return this.props.history.push('/deckReview/' + e.currentTarget.id.substring(6))
    }
    componentDidMount= () => {
        this.props.getSubscribedDecks();
        this.props.getOwnedDecks()
    }

    render() {
        const decks = this.props.decksArr.map(el => (
            <div className="public-deck" onClick={this.updateToDeckReviewPg} id={'deckId'+el._id} key={el._id}>
                <h3>{el.name}</h3>
            </div>
        ));
        return (
            <div >
                Panda
                Here are the decks:
                <div className='flex contain'>
                    {decks}
                </div>
            </div>
        )
    }
}

postMessage.PropTypes = {
    decksArr: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    decksArr: state.decksArr.decks,
    cards: state.cards.cardsArr
})

export default connect(mapStateToProps,  {getSubscribedDecks, getOwnedDecks, getCardsbyDeckId})(MyDecksPg);
