import { FETCH_COURSE_CARDS } from './types';
import { API } from '../../utils/api'

export const getCourseCards = () => dispatch => {
    console.log('fetching colors for real');
    API.getCourseCards()
    // .then(res => console.log(res.data))
    .then(res => dispatch({
        type: FETCH_COURSE_CARDS,
        payload: res.data  
    }))

}
