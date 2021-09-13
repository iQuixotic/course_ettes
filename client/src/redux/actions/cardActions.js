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


export const getCardsbyDeckId = (id) => dispatch => {
    API.getCardsbyDeckId(id)    
    .then(res => dispatch({
        type: FETCH_CARDS_BY_DECKID,
        payload: res.data  
    }))
    .then(res => console.log(res.payload))
    .catch(e => {console.log(e)})
}
