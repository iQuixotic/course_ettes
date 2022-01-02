import { FETCH_COLORS } from './types';
import { API } from '../../utils/api'

export const getColors = () => dispatch => {
    console.log('fetching colors for real');
    API.getColors()
    // .then((res)=>console.log(res.data))
    .then(res => dispatch({
        type: FETCH_COLORS,
        payload: res.data  
    }))
    .then(res => console.log(res.payload))
}
