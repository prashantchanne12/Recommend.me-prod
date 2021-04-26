import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
    userLogoutReducer,
    userProfileReducer,
    userProfileToggleReducer,
    userSessionReducer
} from './reducers/userReducers';
import {
    addRecommendationReducer,
    fetchUserRecommendListsReducer
} from './reducers/recommendReducers';
import { loadingReducer } from './reducers/loadingReducer';
import { alertMessageReducer } from './reducers/alertReducer';

// Combine reducers
const reducer = combineReducers({
    loader: loadingReducer,
    alertMessage: alertMessageReducer,
    userSession: userSessionReducer,
    userProfile: userProfileReducer,
    addRecommendation: addRecommendationReducer,
    userRecommendations: fetchUserRecommendListsReducer,
    userProfileToggle: userProfileToggleReducer,
    userLogout: userLogoutReducer,
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