import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boardReducer';

const store = createStore(combineReducers({ boardReducer }), applyMiddleware(thunk));
export default store;