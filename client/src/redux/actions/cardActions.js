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
    return API.getCardsbyDeckId(id)    
    .then(res => dispatch({
        type: FETCH_CARDS_BY_DECKID,
        payload: res.data  
    }))
    .then(res => {return res.payload})
    // .then(res => console.log('this is the payloaf: ', res.payload))
    .catch(e => {console.log(e)})
}
