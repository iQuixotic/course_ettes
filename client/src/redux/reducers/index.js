import { combineReducers} from 'redux';
import postReducer from './postReducer';
import colorReducer from './colorReducer';
import courseCardsReducer from './courseCardsReducer';
import cardStateReducer from './cardStateReducer';

export default combineReducers({
    courseCards: courseCardsReducer,
    posts: postReducer,
    colors: colorReducer,
    cardState: cardStateReducer
})