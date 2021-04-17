import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomeScreen />
        </Route>
        <Route exact path='/login' >
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
