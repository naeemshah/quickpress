import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
 
import reducers from './app/reducers/index'; //Import the reducer
 
// Connect our store to the reducers
const middleware = applyMiddleware(promise(), thunk);

export default createStore(reducers, middleware);