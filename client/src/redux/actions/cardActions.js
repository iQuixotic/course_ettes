import { FETCH_COURSE_CARDS, FETCH_CARDS_BY_DECKID } from './types';
import { API } from '../../utils/api'

export const getCourseCards = () => dispatch => {
    console.log('fetching colors for real');
    API.getCourseCards()
    // .then(res => console.log(res.data))
    .then(res => dispatch({
        type: FETCH_COURSE_CARDS,
        payload: res.data  
    }))

} 


export const getCardsbyDeckId = (e) => dispatch => {
    console.log('fetching decks for real');
    const id = e.currentTarget.id.substring(6)
    console.log(id)
    API.getCardsbyDeckId(e.currentTarget.id.substring(6))    
    .then(res => dispatch({
        type: FETCH_CARDS_BY_DECKID,
        payload: res.data  
    }))
    .then(res => console.log(res.payload))
    .then(() =>  {return this.props.history.push('/deckReview/' + 7)}) 
    .catch(e => {console.log(e)})
}
