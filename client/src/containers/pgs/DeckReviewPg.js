import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'
import { API } from "../../utils/api";

let y=0;
class DeckReviewPg extends Component {
    state = {
        front_content: '',
        back_content: '',
        cardOfFocus: '',
        cardPlace: 0,
        addToSubscribedDecks: false
    }
    
    componentDidMount= () => {
        this.props.getCardsbyDeckId(window.location.pathname.substring(12))
        this.props.getAllDecks()
        this.getInitialCardUpdate()
        // console.log(this.state.cardOfFocus._id , this.state.front_content )
    }
    // componentDidUpdate = (a, b) => {
    //     this.getInitialCardUpdate()
    // }

    getInitialCardUpdate = () => {
        y++
        if(this.props.cards.length>0 && y<3){
            console.log(this.props.cards[0])
            this.setState({
                front_content: this.props.cards[0].front_content,
                cardOfFocus: this.props.cards[0]
            })
            // this.updateCardShowingState(this.props.cards[0].front_content)
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
        // console.log(this.state)
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

    handleAddToDecks = (e) => {
        console.log(e.currentTarget.id)
        API.addToSubscribedDecks(e.currentTarget.id)
            .then(res => console.log(res))
            .catch(e => { throw e })
    }

    updateCardShowingState = (x) => {
        // console.log(x)
        if(this.state.front_content != null) this.setState({ front_content: x.front_content})
        else this.setState({ back_content: x.back_content})
    }

    render() {
        const deck = this.props.decksArr.map(el => (
            <div className=""  id={'deckId'+el._id} key={el._id}>
                {el._id === window.location.pathname.substring(12) ? (
                <div key={el._id}>
                    <h3>{el.name}</h3> 
                    <button onClick={this.handleAddToDecks} id={el._id}  >Add To Subscrided Decks</button>
                </div>): null}
            </div>
        ));
        const card = this.props.cards.map(el => (
            this.state.front_content === '' ? null : (
                <div key={el._id}>
                {this.state.cardOfFocus._id === el._id && this.state.front_content === el.front_content  ? (
                    <div className=""  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block width-100p'>{el.front_content}</div></div>): null}
                {this.state.cardOfFocus._id === el._id && this.state.back_content === el.back_content ? (
                    <div className=""  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block  width-100p'>{el.back_content}</div><input type='checkbox'></input></div>): null}
            </div>
            
        )))
        return (
            <div className='contain'>
                Panda
                Here are the cards of teh deck:
                {deck}

                Here are the cards: 
                {card}
                <div className='flex navigators'>
                    <div onClick={this.viewPreviousCard}>Previous</div>
                    <div onClick={this.viewNextCard}>Next</div>
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

export default connect(mapStateToProps, {getAllDecks, getCardsbyDeckId})(DeckReviewPg);
