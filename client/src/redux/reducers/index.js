import { combineReducers} from 'redux';
import postReducer from './postReducer';
import colorReducer from './colorReducer';
import courseCardsReducer from './courseCardsReducer';
import cardStateReducer from './cardStateReducer';
import cardReducer from './cardReducer';
import decksReducer from './deckReducer';

export default combineReducers({
    courseCards: courseCardsReducer,
    posts: postReducer,
    colors: colorReducer,
    cardState: cardStateReducer,
    decksArr: decksReducer,
    cards: cardReducer
})