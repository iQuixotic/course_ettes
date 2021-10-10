import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'
// import { API } from "../../utils";

let y=0
class DeckReviewPg extends Component {
    state = {
        front_content: '',
        back_content: '',
        cardOfFocus: '',
        cardPlace: 0
    }
    
    componentDidMount= () => {
        this.props.getCardsbyDeckId(window.location.pathname.substring(12))
        this.props.getAllDecks()
        this.getInitialCardUpdate()
        // this.updateCardShowingState = this.updateCardShowingState.bind(this)
        // this.getInitialCardUpdate = this.getInitialCardUpdate.bind(this)
        // this.flipCard = this.flipCard.bind(this)
        // this.viewNextCard = this.viewNextCard.bind(this)
        // this.viewPreviousCard = this.viewPreviousCard.bind(this)
    }

    getInitialCardUpdate = () => {
        y++
        if(this.props.cards.length>0 && y<3){
            this.setState({
                front_content: this.props.cards[0].front_content,
                cardOfFocus: this.props.cards[0]
            })
            console.log("yes")
        } else if(y<3) setTimeout(() => {
            console.log("no")
            this.getInitialCardUpdate()
        }, 1000);
    }

    flipCard = () => {
        this.state.front_content ? this.setState({
            front_content: null,
            back_content: this.state.cardOfFocus.back_content
        }) : this.setState({
            front_content: this.state.cardOfFocus.front_content,
            back_content: null
        })
        console.log(this.state)
    }

    viewNextCard = () => {
        const x = this.state.cardPlace === this.props.cards.length-1 ? this.state.cardPlace : this.state.cardPlace+1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x],
        }) 
        this.updateCardShowingState(this.props.cards[x])
    }

    viewPreviousCard = () => {
        const x = this.state.cardPlace === 0 ? 0 :this.state.cardPlace-1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x]
        })
        this.updateCardShowingState(this.props.cards[x])
    }

    updateCardShowingState = (x) => {
        if(this.state.front_content != null) this.setState({ front_content: x.front_content})
        else this.setState({ back_content: x.back_content})
    }

    render() {
        const deck = this.props.decksArr.map(el => (
            <div id={'deckId'+el._id} key={el._id}>
                {el._id == window.location.pathname.substring(12) ? <h3>{el.name}</h3> : null}
            </div>
        ));
        const card = this.props.cards.map(el => (
            this.state.front_content === '' ? null : (
            <div onClick={this.flipCard} id={'cardId'+el._id} key={el._id}>
                {this.state.cardOfFocus._id === el._id && this.state.front_content === el.front_content  ? <p>{el.front_content}</p> : null}
                {this.state.cardOfFocus._id === el._id && this.state.back_content === el.back_content ? <p>{el.back_content}</p> : null}
            </div>
            
        )))
        return (
            <div>
                Panda
                Here are the cards of teh deck:
                {deck}
                Here are the cards: 
                <div onClick={this.viewPreviousCard}>Previous</div>
                {card}
                <div onClick={this.viewNextCard}>Next</div>
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
