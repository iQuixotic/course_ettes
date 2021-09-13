import { FETCH_ALL_DECKS } from './types';
import { API } from '../../utils/api'

export const getAllDecks = () => dispatch => {
    console.log('fetching decks for real');
    API.getUserDecks()    
    .then(res => dispatch({
        type: FETCH_ALL_DECKS,
        payload: res.data  
    }))
    .then(res => console.log(res.payload))
}
