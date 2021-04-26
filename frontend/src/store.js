import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
    mySessionReducer,
    profileToggleReducer,
    userLogoutReducer,
    userProfileReducer,
} from './reducers/userReducers';
import {
    addRecommendationReducer,
    fetchMyRecommendListsReducer,
} from './reducers/recommendReducers';
import { loadingReducer } from './reducers/loadingReducer';
import { alertMessageReducer } from './reducers/alertReducer';

// Combine reducers
const reducer = combineReducers({
    loader: loadingReducer,
    alertMessage: alertMessageReducer,

    mySession: mySessionReducer,
    myRecommendations: fetchMyRecommendListsReducer,
    addRecommendation: addRecommendationReducer,
    profileToggle: profileToggleReducer,
    userLogout: userLogoutReducer,

    userProfile: userProfileReducer,
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