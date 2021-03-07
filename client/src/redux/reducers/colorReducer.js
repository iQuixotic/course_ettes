import { FETCH_COLORS } from '../actions/types';

const initialState = {
    choices: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_COLORS:
            console.log('color reducer');
            return{
               ...state,
               choices: action.payload
           } ;
       
        default:
            return state;
    }
}