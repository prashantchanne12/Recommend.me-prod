import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userSessionReducer } from './reducers/userReducers';
import { loaderReducer } from './reducers/loaderReducers';
import { addRecommendationReducer } from './reducers/recommendReducers';

// Combine reducers
const reducer = combineReducers({
    userSession: userSessionReducer,
    loader: loaderReducer,
    addRecommendation: addRecommendationReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const middleware = [thunk];

const initialState = {
    userSession: { user: userInfoFromStorage }
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;