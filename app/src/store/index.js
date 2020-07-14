import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import bReducer from './reducers/boardReducer';

const store = createStore(combineReducers({ bReducer }), applyMiddleware(thunk));
export default store;