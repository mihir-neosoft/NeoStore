import { combineReducers } from 'redux';

import auth from './auth';
import cart from './cart';
// import profiles from './profiles';

export default combineReducers({ auth, cart });