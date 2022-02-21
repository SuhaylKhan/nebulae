import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { login, signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(
        firstName,
        lastName,
        username,
        email,
        password
      ));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['PASSWORD and CONFIRM PASSWORD fields must match'])
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}/servers`} />;
  }

  const handleDemo = async () => {
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password';
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
  }

  return (
    <div className='auth-form-outer'>
      <div className='auth-form-container'>
        <div className='auth-form-inner'>
          <div className='auth-text-container'>
            <div>Create an account</div>
            <div>
              Not conviced?
              <button onClick={handleDemo}>Demo</button>
            </div>
            <div>
              Already have an account?
              <NavLink to='/login' exact={true} activeClassName='active'>
                Log in
              </NavLink>
            </div>
          </div>
          <form onSubmit={onSignUp}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind} className='auth-error'>{error}</div>
              ))}
            </div>
            <div className='auth-input-container'>
              <label>FIRST NAME</label>
              <input
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>
            <div className='auth-input-container'>
              <label>LAST NAME</label>
              <input
                type='text'
                name='lasttName'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div className='auth-input-container'>
              <label>USERNAME</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='auth-input-container'>
              <label>EMAIL</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='auth-input-container'>
              <label>PASSWORD</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='auth-input-container'>
              <label>CONFIRM PASSWORD</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
              ></input>
            </div>
            <button className='auth-button' type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
