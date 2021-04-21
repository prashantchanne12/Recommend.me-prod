import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userProfileReducer } from './reducers/userReducers';

// Combine reducers
const reducer = combineReducers({
    userProfile: userProfileReducer,
});


const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;