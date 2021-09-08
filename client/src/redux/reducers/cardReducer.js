import { FETCH_CARDS_BY_DECKID } from '../actions/types';

const initialState = {
    cardsArr: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CARDS_BY_DECKID:
            console.log('card reducer');
            return{
               ...state,
               cardsArr: action.payload
           } ;
       
        default:
            return state;
    }
}