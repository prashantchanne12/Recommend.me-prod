import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Layout from './components/Layout/Layout';
import CreateRecommendationScreen from './screens/CreateRecommendationScreen/CreateRecommendationScreen';
import UserProfile from './screens/UserProfile/UserProfile';

import { mySession } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Share from './components/Share/Share';
import ListScreen from './screens/ListScreen/ListScreen';
import ChangeUserName from './components/ChangeUserName/ChangeUserName';

function App() {

  const dispatch = useDispatch();

  const { show } = useSelector(state => state.shareToggle);

  useEffect(() => {
    dispatch(mySession());
  }, [dispatch]);

  return (
    <Router>
      <ChangeUserName />
      {
        show && <Share />
      }
      <div className='overlay'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: `${true ? 0.4 : 1}`,
        }}
      >

        <Layout>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/create' component={CreateRecommendationScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route path='/profile/:userId' component={UserProfile} />
          <Route path='/list/:listId' component={ListScreen} />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
