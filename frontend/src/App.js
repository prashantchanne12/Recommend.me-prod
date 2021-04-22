import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Layout from './components/Layout/Layout';
import CreateRecommendationScreen from './screens/CreateRecommendationScreen/CreateRecommendationScreen';

import { userSession } from './actions/userActions';
import { loadingStart, loadingEnd } from './actions/loaderActions';
import { useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingStart());
    dispatch(userSession());
    dispatch(loadingEnd());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/create' component={CreateRecommendationScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
      </Layout>
    </Router>
  );
}

export default App;
