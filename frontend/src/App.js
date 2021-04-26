import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Layout from './components/Layout/Layout';
import CreateRecommendationScreen from './screens/CreateRecommendationScreen/CreateRecommendationScreen';
import UserProfile from './screens/UserProfile/UserProfile';

import { mySession } from './actions/userActions';
import { useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mySession());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/create' component={CreateRecommendationScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
        <Route path='/profile/:userId' component={UserProfile} />
      </Layout>
    </Router>
  );
}

export default App;
