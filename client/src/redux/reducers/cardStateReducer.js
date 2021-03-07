import { cardTypes } from '../actions/types' 

const initialState = {
    flip: true,
    isFlipped: true,
    frontOfCard: "Redux",
    backOfCard: "PG words for the internet commit..."
}

export default function(state = initialState, action) {
    switch(action.type) {
        case cardTypes.CARD_FLIP:
            console.log('CARD_FLIP');
            return{
               ...state,
               flip: action.payload.flip
            };
        case cardTypes.CARD_IS_FLIPPED:
            console.log('IS_FLIPPED');
            return{
                ...state,
                isFlipped: action.payload.isFlipped
            };
        case cardTypes.FRONT_OF_CARD:
            console.log('FRONT_OF_CARD');
            return{
                ...state,
                frontOfCard: action.payload.frontOfCard
            };

        case cardTypes.BACK_OF_CARD:
            console.log('BACK_OF_CARD');
            return{
                ...state,
                backOfCard: action.payload.backOfCard
            };
        default:
            return state;
    }
}