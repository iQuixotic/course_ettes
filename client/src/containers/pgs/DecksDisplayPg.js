import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'
// import { API } from "../../utils";

class DecksDisplayPg extends Component {
    // state = {
    //     decks: []
    // }
    updateToDeckReviewPg = (e) => {
        return this.props.history.push('/deckReview/' + e.currentTarget.id.substring(6))
    }
    componentDidMount= () => {
        this.props.getAllDecks();
        // this.props.getCardsbyDeckId(1)
        // console.log(this.props.decksArr)
        // API.getUserDecks()
        //     .then(res => {
        //         this.setState({
        //             decks: res.data
        //         })
        //     })
        //     .then(() => console.log(this.state))
        //     .catch(e => {throw e})
    }

    render() {
        const decks = this.props.decksArr.map(el => (
            <div onClick={this.updateToDeckReviewPg} id={'deckId'+el._id} key={el._id}>
                <h3>{el.name}</h3>
            </div>
        ));
        return (
            <div>
                Panda
                Here are the decks:
                {decks}
                 {/* {this.state.decks.map(el => {
                     return(
                        <div>
                             {el.name}
                        </div>
                     )
                 })} */}
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

export default connect(mapStateToProps, {getAllDecks, getCardsbyDeckId})(DecksDisplayPg);
