import { FETCH_ALL_DECKS, FETCH_ALL_OWNED_DECKS, FETCH_ALL_SUBSCRIBED_DECKS } from './types';
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

export const getSubscribedDecks = () => dispatch => {
    console.log('fetching my decks for real');
    return API.getSubscribedDecks()    
    .then(res => dispatch({
        type: FETCH_ALL_SUBSCRIBED_DECKS,
        payload: res.data  
    }))
    .then(res => res.payload)
}

export const getOwnedDecks = () => dispatch => {
    console.log('fetching my decks for real');
    return API.getOwnedDecks()    
    .then(res => dispatch({
        type: FETCH_ALL_OWNED_DECKS,
        payload: res.data  
    }))
    .then(res => res.payload)
}
