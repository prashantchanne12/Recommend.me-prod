import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Layout from './components/Layout/Layout';
import CreateRecommendationScreen from './screens/CreateRecommendationScreen/CreateRecommendationScreen';
import UserProfile from './screens/UserProfile/UserProfile';

import { myNotification, mySession } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Share from './components/Share/Share';
import ListScreen from './screens/ListScreen/ListScreen';
import ChangeUserName from './components/ChangeUserName/ChangeUserName';
import Warning from './components/Warning/Warning';
import { fetchMyRecommendations } from './actions/recommendActions';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ChatScreen from './screens/ChatScreen/ChatScreen';

function App() {
  const dispatch = useDispatch();

  const { show } = useSelector((state) => state.shareToggle);
  const { toggle } = useSelector((state) => state.changeUserNameToggle);
  const { toggle: warning } = useSelector((state) => state.warningCard);

  useEffect(() => {
    dispatch(mySession());
    dispatch(myNotification());
    dispatch(fetchMyRecommendations());
  }, [dispatch]);

  return (
    <Router>
      {toggle && <ChangeUserName />}
      {show && <Share />}
      {warning && <Warning />}
      <div
        className='overlay'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // background: 'rgba(0, 0, 0, 0.6)',
          opacity: `${show || toggle || warning ? 0.4 : 1}`,
        }}
      >
        <Layout>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route exact path='/create' component={CreateRecommendationScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route path='/profile/:userId' component={UserProfile} />
          <Route path='/list/:listId' component={ListScreen} />
          <Route path='/chats' component={ChatScreen} />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
