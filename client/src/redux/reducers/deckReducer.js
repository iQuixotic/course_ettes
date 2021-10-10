import { FETCH_ALL_DECKS, FETCH_ALL_OWNED_DECKS, FETCH_ALL_SUBSCRIBED_DECKS} from '../actions/types';

const initialState = {
    decks: [],
    subscribedDecks: [],
    ownedDecks: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ALL_DECKS:
            console.log('decks reducer');
            return{
               ...state,
               decks: action.payload
           } ;

        case FETCH_ALL_SUBSCRIBED_DECKS:
        console.log('decks reducer');
        return{
            ...state,
            subscribedDecks: action.payload
        } ;

        case FETCH_ALL_OWNED_DECKS:
        console.log('decks reducer');
        return{
            ...state,
            ownedDecks: action.payload
        } ;
       
        default:
            return state;
    }
}