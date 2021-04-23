import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userSessionReducer } from './reducers/userReducers';
import {
    addRecommendationReducer,
    fetchUserRecommendListsReducer
} from './reducers/recommendReducers';
import { loadingReducer } from './reducers/loadingReducer';

// Combine reducers
const reducer = combineReducers({
    loader: loadingReducer,
    userSession: userSessionReducer,
    addRecommendation: addRecommendationReducer,
    userRecommendations: fetchUserRecommendListsReducer,
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