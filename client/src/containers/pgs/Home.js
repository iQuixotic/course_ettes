import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from '../../components'
import { API } from "../../utils/api";
import { getSubscribedDecks, getOwnedDecks } from '../../redux/actions/deckActions'
import { getColors } from '../../redux/actions/colorActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'

let y=0, x;
class Home extends Component {
    state = {
        colorsArr: [],
        deckFocusColor: 'red',
        front_content: '',
        back_content: '',
        cardOfFocus: '',
        cardPlace: 0,
        addToSubscribedDecks: false,
        deckColorName: 'red',
        sendingDeckName: '',
        sendingFrontContent: '',
        sendingBackContent: '',
        modalVisible: false,
        modalType: 'none',
        message: ['Please make sure that you provide all required fields'],
        messageType: 'success',
        messageBool: true,
        cardNum: 0,
        showingDeckId: '',
        deckIndex: 0
    }

    componentDidMount = () => {
        this.props.getColors();
        this.props.getSubscribedDecks()
        this.getCards()
        // this.getInitialCardUpdate()
            // .then(res => console.log(res))
            // .then(res => this.props.getCardsbyDeckId(res.data))
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    getCards = () => {
        this.props.getCardsbyDeckId(1)
        // this.getInitialCardUpdate()
        // console.log(' cards here:  0',this.props.cards)
        // setTimeout(() => {
        //     // console.log(this.props.decksArr)
        //     console.log(' cards here:  5',this.props.cards)
        //     // this.props.getCardsbyDeckId(1)
        //     // this.getInitialCardUpdate()
        // }, 1000);

        console.log(' cards here:  1', this.props.cards)
        y++
        if(this.props.cards.length>0 && y<3){
            // console.log(this.props.cards[0])
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

    
    getInitialCardUpdate = () => {
        console.log('----------------')
        console.log(' cards here:  1',this.props.cards)
        y++
        if(this.props.cards.length>0 && y<3){
            // console.log(this.props.cards[0])
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

    handleDeckFocusChange = (e) => {
        let x = this.colorTextHandler(e.currentTarget.children[1].innerText)
        this.setState({
            deckFocusColor: x
        })
    }

    getInitialCardUpdate = () => {
        y++
        if(this.props.cards.length>0 && y<3){
            // console.log(this.props.cards[0])
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

    updateCardShowingState = (x) => {
        if(this.state.front_content != null) this.setState({ front_content: x.front_content})
        else this.setState({ back_content: x.back_content})
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

    viewNextCard = () => {
        const x = this.state.cardPlace === this.props.cards.length-1 ? this.state.cardPlace : this.state.cardPlace+1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x],
        }) 
        if(this.props.cards.length > 0) this.updateCardShowingState(this.props.cards[x])
        else console.log('the deck has no cards')
        console.log(this.props.cards.length         )
        console.log(this.props.cards        )
    }

    viewPreviousCard = () => {
        const x = this.state.cardPlace === 0 ? 0 :this.state.cardPlace-1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x]
        })
        if(this.props.cards.length > 0) this.updateCardShowingState(this.props.cards[x])
        else console.log('the deck has no cards')
    }

    colorTextHandler = (color) => {
        switch (color) {
            case 'red':
                return `Don't Know it`
            case 'orange':
                return `Know it a little`
            case 'green':
                return `Know it well`
            case 'pink':
                return `New`
            case 'blue':
                return `Other`
            case `Don't Know it`:
                return 'red'
            case `Know it a little`:
                return 'orange'
            case `Know it well`:
                return 'green'
            case `New`:
                return 'pink'
            case `Other`:
                return 'blue'
        
            default:
                break;
        }
    }

    openCreateDeckModal = () => {
        this.setState({
            modalVisible: true,
            modalType: 'create'
        })
    }

    openSelectDeckModal = () => {
        this.setState({
            modalVisible: true,
            modalType: 'select'
        })
    }

    openDeleteDeckModal = () => {
        this.setState({
            modalVisible: true,
            modalType: 'delete'
        })
    }

    modalCardSelectHandler = () => {
        console.log('x is the thing: ', x !== this.props.decksArr[this.state.deckIndex]._id)
        if(x !== this.props.decksArr[this.state.deckIndex]._id) this.props.getCardsbyDeckId(this.props.decksArr[this.state.deckIndex]._id)
        x = this.props.decksArr[this.state.deckIndex]._id
        if(this.props.cards != undefined && this.props.cards[0] != undefined ) this.updateCardShowingFromModal()
        else if(y<10) {console.log(y); y++; setTimeout(this.modalCardSelectHandler, 175)}
        else if(this.props.cards != undefined && this.props.cards[0] === undefined) {console.log('There are no cards in this deck'); y=3; x='wrong';}
        else {y=3; x='wrong';}
        

    }
    updateCardShowingFromModal = () => {
        console.log('I am trying')
        this.modalCloseHandler()
        if (this.props.cards[0]) {
            this.setState({
                front_content: this.props.cards[0].front_content,
                cardOfFocus: this.props.cards[0],

            }, this.updateCardShowingState(this.props.cards[0]), this.modalCloseHandler())
        } else {
            console.log('no cards to show')
            this.modalCloseHandler()
        }

    }

    modalCloseHandler = () => {
      
        // we need to get the cars, but first we need to be grabbing EVERY deckid when grabbing the names...
        
        // this.setState({ front_content: x.front_content})
        console.log('carsd', this.props.cards)
        this.setState({
            modalVisible: false,
            cardNum: 0,
            modalType: 'none',
            message: [],
            messageType: '',
            messageBool: false

        })
    }

    createDeckWithCards = async () => {
        if(this.state.cardNum === 0)  await this.addNewDeckHandler()
        if(this.state.cardNum !== 0)this.addCardHandler()
    }

    addCardHandler = async () => {
        await API.createNewCard(this.state.sendingFrontContent, this.state.sendingBackContent, this.state.showingDeckId)
            .then(res => console.log(res))
            .catch(e => { throw e })
        this.setState({
            cardNum: this.state.cardNum+1
        })
    }

    addNewDeckHandler = async () => {
        await API.createNewDeck(this.state.sendingDeckName)
            .then(res => {
                this.setState({ showingDeckId: res.data[1].id })
            })
            .then(() => this.addCardHandler())
            .catch(e => { throw e })
    }

    modalDeckDeleteHandler = () => {
        console.log('this is the id i think ', this.props.decksArr[this.state.deckIndex]._id)
        API.deleteDeck(this.props.decksArr[this.state.deckIndex]._id)
            .then(() => {
                 if(this.props.decksArr.lenth>1 && this.state.deckIndex < this.props.decksArr.length-1) this.setState({ deckIndex: this.state.deckIndex+1 })
                 else this.setState({ deckIndex: 0 })
                 this.props.getSubscribedDecks()
                 this.props.getCardsbyDeckId(this.props.decksArr[this.state.deckIndex+1]._id)
                 console.log(this.props.decksArr)
                 console.log(this.props.decksArr[this.state.deckIndex]._id)
            })
    }

    viewNextDeck = () => {
        if(this.state.deckIndex < this.props.decksArr.length-1) this.setState({deckIndex: this.state.deckIndex+1})
    }

    viewPrevDeck = () => {
        if(this.state.deckIndex > 0) this.setState({deckIndex: this.state.deckIndex-1})
    }

    render() {
        const deck = this.props.decksArr.length > 0 ? (
        <div>{this.props.decksArr[this.state.deckIndex].name}</div> ): null 
        // const decks = this.props.decksArr.length > 0 ? this.props.decksArr.map(el => (
        //     <div className=""  id={'deckId'+el._id} key={el._id}>
        //         <div key={el._id}>
        //             <h3>{el.name}</h3> 
        //         </div>
        //     </div>)): null

        const card = this.props.cards.length > 0 ? this.props.cards.map(el => (
            this.state.front_content === '' ? null : (
                <div key={el._id}>
                {this.state.cardOfFocus._id === el._id && this.state.front_content === el.front_content  ? (
                    <div className="full-card"  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block width-100p'>{el.front_content}</div></div>): null}
                {this.state.cardOfFocus._id === el._id && this.state.back_content === el.back_content ? (
                    <div className="full-card"  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block  width-100p'>{el.back_content}</div></div>): null}
            </div>))): null
        return (
            <div className='HomePg'>
                {this.state.modalVisible ? <Modal 
                close={this.modalCloseHandler} 
                type={this.state.modalType}
                message={this.state.message}
                messageType={this.state.messageType}
                messageBool={this.state.messageBool}
                cardNum={this.state.cardNum}
                addCard={this.createDeckWithCards}
                inputChange={e => this.inputChangeHandler(e)}
                decksOwned={this.props.decksArr[this.state.deckIndex].name}    
                nextDeck={this.viewNextDeck}
                prevDeck={this.viewPrevDeck}            
                deckSelect={this.modalCardSelectHandler}
                deckDelete={this.modalDeckDeleteHandler}
                /> : null}
                <div className='home-grid'>
                    <div className='color-select-area one'>
                        <div className='chosen-decks'>Current Deck Selected:</div>
                        {this.props.colors.map(el => {
                            return(
                            <div key={el._id}>
                                {this.state.deckFocusColor === el.color ? (
                                <div onClick={this.handleDeckFocusChange} className='chosen-deck-with-border chosen-deck'>
                                    <div className={`chosen-deck-square-${el.color}`}></div>
                                    <div className='color'>{this.colorTextHandler(el.color)}</div>
                                </div>) :  <div onClick={this.handleDeckFocusChange} className='chosen-deck'>
                                    <div className={`chosen-deck-square-${el.color}`}></div>
                                    <div className='color'>{this.colorTextHandler(el.color)}</div>
                                </div>
                        }
                            </div>)
                        })}
                    </div>
                    <div className='main-panel two '>
                        <div className='decks-with-prev-next'>
                            {/* <div className='prev'>Previous</div> */}
                            <div className='deck-name'>{deck}</div>   
                            {/* <div className='next'>Next</div> */}
                        </div>
                        <div className='cards-with-prev-next'>
                                {card}
                            <div className='prev-next-area'>
                                <div className='prev' onClick={this.viewPreviousCard}>Previous</div>
                                <div className='next' onClick={this.viewNextCard}>NexttS</div>
                            </div>
                        </div>
                            {/* <div className='prev'>Previous</div>
                                {card}
                            <div className='next'>Next</div> */}
                        {/* </div> */}
                    </div>
                    <div className='decks-area three'>
                        <div className='decks-area-buttons'>
                            <button onClick={this.openCreateDeckModal}>Create Deck</button>
                            <button onClick={this.openSelectDeckModal}>Select Deck</button>
                            <button onClick={this.openDeleteDeckModal}>Delete Deck</button>
                        </div>
                    </div>

                {/* </div> */}
                {/* <div className='row'> */}
                    <div className='bottom-panel four'>
                        <div className = 'bottom-panel-shifted'>
                            <div className='bottom-panel-color-squares'>
                                <div className='chosen-deck-square-red'></div>
                                <div className='chosen-deck-square-pink'></div>
                                <div className='chosen-deck-square-blue'></div>
                                <div className='chosen-deck-square-green'></div>
                                <div className='chosen-deck-square-orange'></div>
                            </div>
                                {`move card to ${this.state.deckColorName} deck`}
                        </div>
                        {/* write notes here */}
                        {/* assign to different color here */}
                    </div>
                    <div className='notes five'>
                        hellosddddd
                        {/* add notes that are mapped over here...  */}
                        {/* notes should be expandable/shrinkable section */}
                    </div>
                </div>
            </div>
        )
    }
}

postMessage.PropTypes = {
    subscribedDecksArr: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    decksArr: state.decksArr.subscribedDecks,
    colors: state.colors.choices,
    cards: state.cards.cardsArr
})

export default connect(mapStateToProps,  
    {getSubscribedDecks, getOwnedDecks, getCardsbyDeckId,
    getColors})(Home);