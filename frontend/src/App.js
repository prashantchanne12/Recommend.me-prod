import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Layout from './components/Layout/Layout';
import CreateRecommendationScreen from './screens/CreateRecommendationScreen/CreateRecommendationScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path='/'>
            <HomeScreen />
          </Route>
          <Route exact path='/login' >
            <LoginScreen />
          </Route>
          <Route exact path='/create'>
            <CreateRecommendationScreen />
          </Route>
          <Route exact path='/profile'>
            <ProfileScreen />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
