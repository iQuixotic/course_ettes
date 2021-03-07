import { FETCH_COURSE_CARDS } from '../actions/types';

const initialState = {
    choices: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_COURSE_CARDS:
            console.log('csafkjasd;fj reducer');
            return{
               ...state,
               choices: action.payload
           } ;
       
        default:
            return state;
    }
}