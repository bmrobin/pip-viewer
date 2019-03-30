import { combineReducers } from 'redux';
import packagesReducer from './packageReducer';

export default combineReducers({
  packages: packagesReducer,
});
