import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userSessionReducer } from './reducers/userReducers';
import { loaderReducer } from './reducers/loaderReducers';

// Combine reducers
const reducer = combineReducers({
    userSession: userSessionReducer,
    loader: loaderReducer,
});


const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;