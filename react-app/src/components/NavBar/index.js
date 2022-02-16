import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {user ?
          <li>
            <LogoutButton />
          </li>
          :
          <li>
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </li>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
