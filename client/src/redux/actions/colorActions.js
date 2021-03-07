import { FETCH_COLORS } from './types';
import { API__COLORS } from '../../utils'

export const getColors = () => dispatch => {
    console.log('fetching colors for real');
    API__COLORS.getColors()
    .then(res => dispatch({
        type: FETCH_COLORS,
        payload: res.data  
    }))
}
