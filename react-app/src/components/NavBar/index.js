import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Servers from '../Servers';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav id='nav-bar'>
      <ul id='nav-bar-list'>
        <li id='home-button' className='nav-bar-navlink'>
          <NavLink to='/' exact={true} activeClassName='active'>
            N E B U L A E
          </NavLink>
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
                Sign Up
              </NavLink>
            </div>
          </li>
        }
      </ul>
      {user &&
        <Servers />
      }
    </nav>
  );
}

export default NavBar;
