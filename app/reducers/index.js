import { combineReducers } from 'redux';
import product from './product';
import storeData from './storeData';

// Combine all the reducers
const rootReducer = combineReducers({
  product,
  storeData,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
