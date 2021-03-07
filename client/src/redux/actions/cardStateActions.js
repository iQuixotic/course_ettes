// import { CARD_FLIP, CARD_IS_FLIPPED, BACK_OF_CARD, FRONT_OF_CARD} from './types'
import { cardTypes } from './types'

export const cardFlip = (currentFlippedStatus) => dispatch => {
    console.log("I am called", !currentFlippedStatus, "-----")
    dispatch({
        type: cardTypes.CARD_FLIP,
        payload: !currentFlippedStatus
    });
}