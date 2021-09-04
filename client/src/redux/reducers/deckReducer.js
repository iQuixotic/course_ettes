import { FETCH_ALL_DECKS } from '../actions/types';

const initialState = {
    decks: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ALL_DECKS:
            console.log('decks reducer');
            return{
               ...state,
               decks: action.payload
           } ;
       
        default:
            return state;
    }
}