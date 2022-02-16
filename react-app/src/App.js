import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddServerForm from './components/AddServerForm'
import HomePage from './components/HomePage';
import Servers from './components/Servers';
import { authenticate } from './store/session';
import EditServerForm from './components/EditServerForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users/:id/servers' exact={true} >
          <Servers />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/new' exact={true} >
          <AddServerForm />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/:id/edit' exact={true} >
          <EditServerForm />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
