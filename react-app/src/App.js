import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/HomePage';
import EditServerForm from './components/EditServerForm';
import Channels from './components/Channels';
import AddChannelForm from './components/AddChannelForm';
import { authenticate } from './store/session';
import EditChannelForm from './components/EditChannelForm';
import { useServerContext } from './context/ServerContext';
import { loadChannels } from './store/channel';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { serverId } = useServerContext();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (serverId) {
      (async() => {
        await dispatch(loadChannels(serverId));
      })();
    }
  }, [dispatch, serverId]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/login', '/sign-up']}>
          {null}
        </Route>
        <Route>
          <NavBar />
        </Route>
      </Switch>

      {user &&
        <Channels />
      }

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/servers/:serverId/edit' exact={true} >
          <EditServerForm />
        </ProtectedRoute>

        <ProtectedRoute path='/servers/:serverId/channels' exact={true} >
          <Channels />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/new' exact={true} >
          <AddChannelForm />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/:channelId/edit' exact={true} >
          <EditChannelForm />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <HomePage />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
