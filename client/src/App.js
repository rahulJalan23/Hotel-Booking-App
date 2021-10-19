import './styles/App.css';
import React from 'react';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/user/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AddHotel from './components/hotels/AddHotel';

function App() {
  const auth = window.localStorage.auth;
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth);
    {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: JSON.parse(window.localStorage.auth),
      });
    }
    return () => {};
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/hotels/new" component={AddHotel} />
      </Switch>
    </div>
  );
}

export default App;
