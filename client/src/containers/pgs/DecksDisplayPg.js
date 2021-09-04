import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllDecks } from '../../redux/actions/deckActions'
// import { API } from "../../utils";

class DecksDisplayPg extends Component {
    // state = {
    //     decks: []
    // }

    componentDidMount= () => {
        this.props.getAllDecks();
        console.log(this.props.decksArr)
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
            <div >
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
    decksArr: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    decksArr: state.decksArr.decks,
})

export default connect(mapStateToProps, {getAllDecks})(DecksDisplayPg);
