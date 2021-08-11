import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
    followUserReducer,
    inboxToggleReducer,
    mySessionReducer,
    profileToggleReducer,
    unfollowUserReducer,
    userLogoutReducer,
    userProfileReducer,
} from './reducers/userReducers';
import {
    addRecommendationReducer,
    downvoteRecommendListsReducer,
    fetchMyRecommendListsReducer,
    fetchUserRecommendListReducer,
    shareListReducer,
    upvoteRecommendListsReducer,
} from './reducers/recommendReducers';
import { searchProfileReducer } from './reducers/searchReducers';
import { loadingReducer } from './reducers/loadingReducer';
import { alertMessageReducer } from './reducers/alertReducer';
import { myTimelineReducer } from './reducers/timelineReducers';
import { postReducer } from './reducers/recommendPostReducers';

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
    userRecommendations: fetchUserRecommendListReducer,
    userFollow: followUserReducer,
    userUnfollow: unfollowUserReducer,

    searchUsers: searchProfileReducer,
    inboxToggle: inboxToggleReducer,
    shareToggle: shareListReducer,

    recommendListUpvote: upvoteRecommendListsReducer,
    recommendLisDownvote: downvoteRecommendListsReducer,

    myTimeline: myTimelineReducer,

    singlePost: postReducer,
});

// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const middleware = [thunk];

// const initialState = {
//     userSession: { user: userInfoFromStorage }
// }

const store = createStore(
    reducer,
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;