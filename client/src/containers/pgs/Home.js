import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSubscribedDecks, getOwnedDecks } from '../../redux/actions/deckActions'
import { getColors } from '../../redux/actions/colorActions'
import {  getCardsbyDeckId } from '../../redux/actions/cardActions'

let y=0;
class Home extends Component {
    state = {
        colorsArr: [],
        deckFocusColor: 'red',
            front_content: '',
            back_content: '',
            cardOfFocus: '',
            cardPlace: 0,
            addToSubscribedDecks: false
    }

    componentDidMount = () => {
        this.props.getColors();
        this.props.getSubscribedDecks()
        this.getCards()
            // .then(res => console.log(res))
            // .then(res => this.props.getCardsbyDeckId(res.data))
    }

    getCards = () => {
        
        setTimeout(() => {
            console.log(this.props.decksArr)
            this.props.getCardsbyDeckId(1)
            this.getInitialCardUpdate()
        }, 1000);
    }

    
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

    handleDeckFocusChange = (e) => {
        let x = this.colorTextHandler(e.currentTarget.children[1].innerText)
        this.setState({
            deckFocusColor: x
        })
    }

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

    updateCardShowingState = (x) => {
        // console.log(x)
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

    render() {
        const deck = this.props.decksArr.map(el => (
            <div className=""  id={'deckId'+el._id} key={el._id}>
                <div key={el._id}>
                    <h3>{el.name}</h3> 
                </div>
            </div>))

        const card = this.props.cards.map(el => (
            this.state.front_content === '' ? null : (
                <div key={el._id}>
                {this.state.cardOfFocus._id === el._id && this.state.front_content === el.front_content  ? (
                    <div className="full-card"  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block width-100p'>{el.front_content}</div></div>): null}
                {this.state.cardOfFocus._id === el._id && this.state.back_content === el.back_content ? (
                    <div className="full-card"  onClick={this.flipCard} id={'cardId'+el._id} key={el._id}><div className='public-card lg-card inline-block  width-100p'>{el.back_content}</div></div>): null}
            </div>)))
        return (
            <div className='HomePg'>
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
                        {/* left side attach */}
                        {/* select which color deck you will use */}
                        fdasfa
                    </div>
                    <div className='main-panel two '>
                        <div className='decks-with-prev-next'>
                            <div className='prev'>Previous</div>
                            <div className='deck-name'>{deck}</div>   
                            <div className='next'>Next</div>
                        </div>
                        <div className='cards-with-prev-next'>
                                {card}
                            <div className='prev-next-area'>
                                <div className='prev' onClick={this.viewPreviousCard}>Previous</div>
                                <div className='next' onClick={this.viewNextCard}>Next</div>
                            </div>
                        </div>
                            {/* <div className='prev'>Previous</div>
                                {card}
                            <div className='next'>Next</div> */}
                        {/* </div> */}
                    </div>
                    <div className='decks-area three'>
                        fdjska;lfjsda;
                        {/* top right area */}
                    </div>

                {/* </div> */}
                {/* <div className='row'> */}
                    <div className='bottom-panel four'>
                        helloss
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