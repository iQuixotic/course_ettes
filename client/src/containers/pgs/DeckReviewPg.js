import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'
// import { API } from "../../utils";

class DeckReviewPg extends Component {
    state = {
        front_content: '',
        back_content: '',
        cardOfFocus: ''
    }

    componentDidMount= () => {
        console.log(window.location.pathname.substring(12))
        this.props.getCardsbyDeckId(window.location.pathname.substring(12))
        this.props.getAllDecks()
        // console.log(this.props.cards[0])
        // .then(this.setState({
        //     front_content: this.props.cards[0]
        // }, console.log(this.state)))

        // console.log(',',x)
    }

    getInitialCardUpdate = () => {
        console.log('pppp', this.props.cards[0])
        this.setState({
            front_content: this.props.cards[0].front_content,
            cardOfFocus: this.props.cards[0]
        })
        // return <div>{this.props.cards[0]}</div>
    }

    flipCard = () => {
        this.state.front_content ? this.setState({
            front_content: null,
            back_content: this.state.cardOfFocus.back_content
        }) : this.setState({
            front_content: this.state.cardOfFocus.front_content,
            back_content: null
        })
    }

    render() {
        const deck = this.props.decksArr.map(el => (
            <div id={'deckId'+el._id} key={el._id}>
                {el._id == window.location.pathname.substring(12) ? <h3>{el.name}</h3> : null}
            </div>
        ));
        const card = this.props.cards.map(el => (
            this.state.front_content === '' ? this.getInitialCardUpdate() : (
            <div onClick={this.flipCard} id={'cardId'+el._id} key={el._id}>
                {this.state.front_content === el.front_content ? <p>{el.front_content}</p> : null}
                {this.state.back_content === el.back_content ? <p>{el.back_content}</p> : null}
            </div>
            
        )))
        return (
            <div>
                Panda
                Here are the cards of teh deck:
                {deck}
                Here are the cards: 
                {card}
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
