import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Servers from '../Servers';
import { login } from '../../store/session';
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleDemo = async () => {
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password';
    const data = await dispatch(login(demoEmail, demoPassword));
  }

  return (
    <nav id='nav-bar'>
      <ul id='nav-bar-list'>
        <li id='home-button' className='nav-bar-navlink'>
          <div>N E B U L A E</div>
        </li>
        {user ?
          <li id='logout'>
            <LogoutButton />
          </li>
          :
          <li id='login-signup'>
            <div className='nav-bar-navlink login-signup'>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Log in
              </NavLink>
            </div>
            <div className='nav-bar-navlink login-signup'>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign up
              </NavLink>
            </div>
            <div className='nav-bar-navlink login-signup'>
              <button onClick={handleDemo}>Demo</button>
            </div>
          </li>
        }
      </ul>
      <div id='servers-container'>
        <div id='servers-scrollable'>
          {user &&
            <Servers />
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
