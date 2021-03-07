import { FETCH_COURSE_CARDS } from './types';
import { API__CARDS } from '../../utils'

export const getCourseCards = () => dispatch => {
    console.log('fetching colors for real');
    API__CARDS.getCourseCards()
    // .then(res => console.log(res.data))
    .then(res => dispatch({
        type: FETCH_COURSE_CARDS,
        payload: res.data  
    }))

}
