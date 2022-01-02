import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from '../../components'
import { API } from "../../utils/api";
import { getSubscribedDecks, getOwnedDecks } from '../../redux/actions/deckActions'
import { getColors } from '../../redux/actions/colorActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'

class Home extends Component {
    state = {
        cardsObj: {red: []},
        deckFocusColor: 'red',
        front_content: '',
        back_content: null,
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
        // let subbed = await this.props.getSubscribedDecks()
        // console.log('the decks i onw', owned, 'but the ones i am aonly subed', subbed)
        if(owned.length>0) this.getCards(owned[0]._id, 'mounting')
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    getCards = async (cardId, phase) => {
        console.log(' ------  getCards called ------ ')
        let s = await this.props.getCardsbyDeckId(cardId)
        this.separateCardsByColor()
        if(phase === 'mounting') this.getInitialCardUpdate(s)    
        else this.getCardUpdate()    
    }

    
    getInitialCardUpdate = (wait) => {
        console.log(' ------  getInitialCardUpdate called ------ ')
        // if()
        if(this.props.cards.length>0){
            this.setState({
                // front_content: this.props.cards[0].front_content,
                // cardOfFocus: this.props.cards[0],
                // cardOfFocus: 
                cardPlace: 0
            })
        }
        this.consoleLog()
        // if(this.state.cardsObj[this.state.deckFocusColor].length > 0) this.updateCardShowingState(this.state.cardsObj[this.state.deckFocusColor][0])
    
    }

    consoleLog = () => {
        // console.log('the state is: ', this.state)/
        console.log('first condition  to show cards', this.state.cardsObj[this.state.deckFocusColor].length>0)
        console.log('second condition  to show cards (expect false)', this.state.front_content === '')
        this.state.cardsObj[this.state.deckFocusColor].map(el => {
            console.log('front is the same: (one must be tru) ', this.state.cardOfFocus._id === el._id && this.state.front_content === el.front_content)
            console.log(this.state.cardOfFocus._id === el._id && this.state.back_content === el.back_content)
        })
    }

    getCardUpdate = () => {
        if(this.state.cardsObj[this.state.deckFocusColor] && this.state.cardsObj[this.state.deckFocusColor].lenth>0){
            this.setState({
                front_content: this.state.cardsObj[this.state.deckFocusColor][0].front_content, 
                back_content: null,
                cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][0], 
                cardPlace: 0,

            })
        }
     }

    separateCardsByColor = () => {
        let tempObj ={}
        for(let i=0; i<this.props.cards.length; i++) {
            if(tempObj[this.props.cards[i].color] !== undefined) tempObj[this.props.cards[i].color].push(this.props.cards[i])
            else tempObj[this.props.cards[i].color] = [this.props.cards[i]]
        }
        if(tempObj[this.state.deckFocusColor] && tempObj[this.state.deckFocusColor][0]) this.setState({
            cardsObj: tempObj, 
            cardOfFocus: tempObj[this.state.deckFocusColor][0],
            front_content: tempObj[this.state.deckFocusColor][0].front_content,
            back_content: null
        }); else  this.setState({
            cardsObj: tempObj, 
            back_content: null
        })
        
    }

    handleDeckFocusChange = (e) => {
        console.log(' ------  handleDeckFocusChange called ------ ')
        let x = this.colorTextHandler(e.currentTarget.children[1].children[0].innerText)
        if(this.state.cardsObj[x] ) this.setState({
            deckFocusColor: x,
            cardPlace: 0,
            cardOfFocus: this.state.cardsObj[x][0],
            front_content: this.state.cardsObj[x][0].front_content,
            back_content: null
        }); else this.setState({
            deckFocusColor: x,
            cardPlace: 0,
        })
    }


    updateCardShowingState = (x) => {
        console.log(' ------  updateCardShowingState called ------ ')
        if(this.state.front_content !== null && this.state.back_content === null) {
            this.setState({ front_content: x.front_content})
        }
        else {
            this.setState({ back_content: x.back_content, front_content: null})
        }
        // this.consoleLog()
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
        if(this.state.cardsObj[this.state.deckFocusColor]) {
            let cc = this.state.cardCounter+1
            const x = this.state.cardsObj[this.state.deckFocusColor] && this.state.cardPlace === this.state.cardsObj[this.state.deckFocusColor].length-1 ? this.state.cardPlace : this.state.cardPlace+1
            this.setState({
                cardPlace: x,
                cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][x],
                cardCounter: cc
            }) 
            if(this.state.cardsObj[this.state.deckFocusColor] && this.state.cardsObj[this.state.deckFocusColor].length > 0) this.updateCardShowingState(this.state.cardsObj[this.state.deckFocusColor][x])
            else console.log('the deck has no cards')
        }
    }

    viewPreviousCard = () => {
        if(this.state.cardsObj[this.state.deckFocusColor]) {
            let cc = this.state.cardCounter-1
            const x = this.state.cardPlace === 0 ? 0 :this.state.cardPlace-1
            this.setState({
                cardPlace: x,
                cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][x],
                cardCounter: cc
            })
            if(this.state.cardsObj[this.state.deckFocusColor].length > 0) this.updateCardShowingState(this.state.cardsObj[this.state.deckFocusColor][x])
            else console.log('the deck has no cards')
        }
        // getColorTotals
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
            if(this.state.cardsObj[this.state.deckFocusColor] && 
                this.state.cardsObj[this.state.deckFocusColor][0]  ) {this.updateCardShowingFromModal()}
            else if(this.state.cardsObj[this.state.deckFocusColor] && 
                !this.state.cardsObj[this.state.deckFocusColor][0]) {console.log('There are no cards in this deck')}
            else {this.updateCardShowingFromModal()}
        } else console.log('there is nothing here to do for now')
        

    }
    updateCardShowingFromModal = () => {
        console.log(' ------  updateCardShowingFromModal called ------ ')
        this.modalCloseHandler()
        if (this.state.cardsObj[this.state.deckFocusColor] && this.state.cardsObj[this.state.deckFocusColor][0]) {
            this.setState({
                front_content: this.state.cardsObj[this.state.deckFocusColor][0].front_content,
                back_content: null,
                cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][0],
                cardPlace: 0,
                cardCounter: 0
            }, this.updateCardShowingState(this.state.cardsObj[this.state.deckFocusColor][0]), this.modalCloseHandler())
            // console.log(this.state.cardsObj[this.state.deckFocusColor][0])
            this.consoleLog()
        } else {
            this.modalCloseHandler()
        }

    }

    modalCloseHandler = async () => {
        console.log(' ------  modalCloseHandler called ------ ')
        let owned = await this.props.getOwnedDecks()
        if(owned.length>0) await this.getCards(owned[this.state.deckIndex]._id, 'updates')

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

    updateColorSelection = (e) => {
        this.setState({
            deckColorName: e.currentTarget.className.slice(19)
        })
        // this.getCardUpdate()
    }

    getIdForColor = () => {
        let elem
        this.props.colors.forEach(el => {
            if (el.color === this.state.deckColorName) elem = el
        })
        return elem
    }
    updateCardColor = () => {
        let tempObj = this.state.cardsObj
        const color = this.getIdForColor()
        // tempObj[this.state.deckFocusColor][tempObj[this.state.deckFocusColor].indexOf(color._id)]
        let old = tempObj[this.state.deckFocusColor][tempObj[this.state.deckFocusColor].indexOf(this.state.cardOfFocus)]
        old.color = this.state.deckColorName
        console.log('old', tempObj)
        tempObj[this.state.deckFocusColor]
            .splice(tempObj[this.state.deckFocusColor].indexOf(this.state.cardOfFocus), 1) 
        if(tempObj[this.state.deckColorName]) 
            tempObj[this.state.deckColorName].push(old)
        else tempObj[this.state.deckColorName] = [old]


        if(tempObj[this.state.deckFocusColor][0]) this.setState({
            cardsObj: tempObj,
            cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][0],
            front_content: tempObj[this.state.deckFocusColor][0].front_content
        }); else this.setState({
            cardsObj: tempObj,
            cardOfFocus: this.state.cardsObj[this.state.deckFocusColor][0]
        })
        

        API.updateCardColor(this.state.cardOfFocus._id, color._id)
            // .then(res => this.setState({ }))
            .then(res => console.log('This is from updating the card color: ', res))
            .then(this.setState({

            }))
            .catch(e => console.log(e))
    }

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

        const card = this.state.cardsObj[this.state.deckFocusColor] && this.state.cardsObj[this.state.deckFocusColor].length > 0 ? this.state.cardsObj[this.state.deckFocusColor].map(el => (
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
                                {this.state.cardsObj[this.state.deckFocusColor] && 
                                this.state.cardsObj[this.state.deckFocusColor].length > 0 ? card : (
                                    <div>There are no cards currently associated with this color.</div>
                                ) }
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
                                <div onClick={this.updateColorSelection} className='chosen-deck-square-red'></div>
                                <div onClick={this.updateColorSelection} className='chosen-deck-square-pink'></div>
                                <div onClick={this.updateColorSelection} className='chosen-deck-square-blue'></div>
                                <div onClick={this.updateColorSelection} className='chosen-deck-square-green'></div>
                                <div onClick={this.updateColorSelection} className='chosen-deck-square-orange'></div>
                            </div>
                                {`move card to ${this.state.deckColorName} deck`}
                                <button onClick={this.updateCardColor}>Update Card Color</button>
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