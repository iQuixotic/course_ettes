import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'
// import { API } from "../../utils";

class DeckReviewPg extends Component {
    // state = {
    //     decks: []
    // }

    componentDidMount= () => {
        console.log(window.location.pathname.substring(12))
        // this.props.getCardsbyDeckId(window.location.pathname.substring(12))
        this.props.getAllDecks();
    }

    render() {
        // const decks = this.props.decksArr.map(el => (
        //     <div onClick={this.props.getCardsbyDeckId} id={'deckId'+el._id} key={el._id}>
        //         <h3>{el.name}</h3>
        //     </div>
        // ));
        return (
            <div>
                Panda
                Here are the cards of teh deck:
                {/* {decks} */}
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

export default connect(mapStateToProps, {getAllDecks, getCardsbyDeckId})(DeckReviewPg);
