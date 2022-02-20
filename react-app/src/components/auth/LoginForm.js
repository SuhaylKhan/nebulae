import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './AuthForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}/servers`} />;
  }

  return (
    <div className='auth-form-container'>
      <div className='auth-form-inner'>
        <div className='auth-text-container'>
          <div>Welcome back!</div>
          <div>
            Need an account?
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign up
            </NavLink>
          </div>
        </div>
        <form onSubmit={onLogin}>
          {errors.map((error, ind) => (
            <div className='auth-error-container'>
              <div key={ind} className='auth-error'>{error}</div>
            </div>
          ))}
          <div className='auth-input-container'>
            <label htmlFor='email'>EMAIL</label>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='auth-input-container'>
            <label htmlFor='password'>PASSWORD</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button
            className='auth-button'
            type='submit'
          >Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
