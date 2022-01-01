import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from '../../components'
import { API } from "../../utils/api";
import { getSubscribedDecks, getOwnedDecks } from '../../redux/actions/deckActions'
import { getColors } from '../../redux/actions/colorActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'

let x;
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
        deckIndex: 0,
        cardCounter: 1
    }

    componentDidMount = async () => {
        this.props.getColors();
        let owned = await this.props.getOwnedDecks()
        let subbed = await this.props.getSubscribedDecks()
        console.log('the decks i onw', owned, 'but the ones i am aonly subed', subbed)
        if(owned.length>0) this.getCards(owned[0]._id)
        // let s = await this.props.getCardsbyDeckId(r[0]._id)
        // this.getInitialCardUpdate(s)
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    getCards = async (cardId) => {
        console.log(' ------  getCards called ------ ')
        let s = await this.props.getCardsbyDeckId(cardId)
        console.log('the cards you have: ', s)
        this.getInitialCardUpdate(s)        
    }

    
    getInitialCardUpdate = (wait) => {
        console.log(' ------  getInitialCardUpdate called ------ ')
        if(this.props.cards.length>0){
            this.setState({
                front_content: this.props.cards[0].front_content,
                cardOfFocus: this.props.cards[0],
                cardPlace: 0
            })
        } 
    }

    handleDeckFocusChange = (e) => {
        console.log(' ------  handleDeckFocusChange called ------ ')
        let x = this.colorTextHandler(e.currentTarget.children[1].children[0].innerText)
        console.log(e.currentTarget.children[1].children[0].innerText)
        this.setState({
            deckFocusColor: x
        })
    }


    updateCardShowingState = (x) => {
        console.log(' ------  updateCardShowingState called ------ ')
        // console.log('the state is', this.state)
        if(this.state.front_content != null && this.state.front_content.back_content == null) {
            this.setState({ front_content: x.front_content}, console.log('lfsdaf true',))
        }
        else {
            this.setState({ back_content: x.back_content}, console.log('lfsdaf', this.state))
        }
    }

    flipCard = () => {
        console.log(' ------  flipCard called ------ ')
        this.state.front_content ? this.setState({
            front_content: null,
            back_content: this.state.cardOfFocus.back_content
        }) : this.setState({
            front_content: this.state.cardOfFocus.front_content,
            back_content: null
        })
    }

    viewNextCard = () => {
        let cc = this.state.cardCounter+1
        console.log('this the cc', cc)
        const x = this.state.cardPlace === this.props.cards.length-1 ? this.state.cardPlace : this.state.cardPlace+1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x],
            cardCounter: cc
        }) 
        if(this.props.cards.length > 0) this.updateCardShowingState(this.props.cards[x])
        else console.log('the deck has no cards')
    }

    viewPreviousCard = () => {
        // getColorTotals
        let cc = this.state.cardCounter-1
        const x = this.state.cardPlace === 0 ? 0 :this.state.cardPlace-1
        this.setState({
            cardPlace: x,
            cardOfFocus: this.props.cards[x],
            cardCounter: cc
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

    openModal = (type) => {
        // let modalVisible = this.satat
        this.setState({
            modalVisible: !this.state.modalVisible,
            modalType: type
        })
    }

    modalCardSelectHandler = () => {
        console.log(' ------  modalCardSelectHandler called ------ ')
        if(this.props.ownedDecksArr.length>0) {
            // if(x !== this.props.decksArr[this.state.deckIndex]._id) this.props.getCardsbyDeckId(this.props.decksArr[this.state.deckIndex]._id)
            // x = this.props.decksArr[this.state.deckIndex]._id
            if(this.props.cards != undefined && this.props.cards[0] != undefined ) {this.updateCardShowingFromModal()}
            else if(this.props.cards != undefined && this.props.cards[0] === undefined) {console.log('There are no cards in this deck')}
            else console.log('nothing to reset..')
        } else console.log('there is nothing here to do for now')
        

    }
    updateCardShowingFromModal = () => {
        console.log(' ------  updateCardShowingFromModal called ------ ')
        this.modalCloseHandler()
        if (this.props.cards[0]) {
            this.setState({
                front_content: this.props.cards[0].front_content,
                back_content: '',
                cardOfFocus: this.props.cards[0]
            }, this.updateCardShowingState(this.props.cards[0]), this.modalCloseHandler())
        } else {
            console.log('no cards to show')
            this.modalCloseHandler()
        }

    }

    modalCloseHandler = async () => {
        console.log(' ------  modalCloseHandler called ------ ')
        let owned = await this.props.getOwnedDecks()
        console.log(this.state.deckIndex, this.getCards(owned[this.state.deckIndex]._id))
        if(owned.length>0) await this.getCards(owned[this.state.deckIndex]._id)

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
        else if(this.state.cardNum !== 0)this.addCardHandler()
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
        // console.log('this is the id i think ', this.props.decksArr[this.state.deckIndex]._id)
        API.deleteDeck(this.props.ownedDecksArr[this.state.deckIndex]._id)
            .then(() => {
                 if(this.props.ownedDecksArr.lenth>1 && this.state.deckIndex < this.props.ownedDecksArr.length-1) this.setState({ deckIndex: this.state.deckIndex+1 })
                 else this.setState({ deckIndex: 0 })
                 this.props.getSubscribedDecks()
                 this.props.getCardsbyDeckId(this.props.ownedDecksArr[this.state.deckIndex]._id)
            })
    }

    viewNextDeck = () => {
        if(this.state.deckIndex < this.props.ownedDecksArr.length-1) this.setState({deckIndex: this.state.deckIndex+1})
    }

    viewPrevDeck = () => {
        if(this.state.deckIndex > 0) this.setState({deckIndex: this.state.deckIndex-1})
    }

    // getColorNumCurrent = (color) => {
    //     // if()
        
    //     return counter
    // }
    
    getColorTotals = (color) => {
        let numOf = 0, cards = this.props.cards;
        cards.forEach(el => {
            if(el.color === color) numOf++
        });
        
        return numOf
    }


    render() {
        const deck = this.props.ownedDecksArr.length > 0 ? (
        <div>{this.props.ownedDecksArr[this.state.deckIndex].name}</div> ): null 

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
                decksOwned={this.props.ownedDecksArr.length>0 ? this.props.ownedDecksArr[this.state.deckIndex].name : null}    
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
                                    <div className='color'><div className='color-desc'>{this.colorTextHandler(el.color)} </div><div className='count'>{this.getColorTotals(el.color) >0 ? this.state.cardPlace+1 +'/': null}{this.getColorTotals(el.color)}</div></div>
                                </div>) :  <div onClick={this.handleDeckFocusChange} className='chosen-deck'>
                                    <div className={`chosen-deck-square-${el.color}`}></div>
                                    <div className='color'><div className='color-desc'>{this.colorTextHandler(el.color)}</div> <div className='count'> {this.getColorTotals(el.color)}</div></div>
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

                    </div>
                    <div className='decks-area three'>
                        <div className='decks-area-buttons'>
                            <button onClick={() => this.openModal('create')}>Create Deck</button>
                            <button onClick={() => this.openModal('select')}>Select Deck</button>
                            <button onClick={() => this.openModal('delete')}>Delete Deck</button>
                        </div>
                    </div>

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
    ownedDecksArr: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    ownedDecksArr: state.decksArr.ownedDecks,
    subDecksArr: state.decksArr.subscribedDecks,
    colors: state.colors.choices,
    cards: state.cards.cardsArr
})

export default connect(mapStateToProps,  
    {getSubscribedDecks, getOwnedDecks, getCardsbyDeckId,
    getColors})(Home);