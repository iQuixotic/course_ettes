import React, { Component } from 'react'
import { API } from "../../utils";

class DecksDisplayPg extends Component {
    state = {
        decks: []
    }

    componentDidMount= () => {
        API.getUserDecks()
            .then(res => {
                this.setState({
                    decks: res.data
                })
            })
            .then(() => console.log(this.state))
            .catch(e => {throw e})
    }

    render() {
        // const decks = this.state.decks.map(el => {
        //     <h1>{el.name}</h1>
        // })
        return (
            <div>
                Panda
                Here are the decks:
                 {this.state.decks.map(el => {
                     return(
                        <div>
                             {el.name}
                        </div>
                     )
                 })}
            </div>
        )
    }
}

export default DecksDisplayPg;