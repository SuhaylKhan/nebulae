import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as serverActions from '../../store/server';

function Servers() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [serverName, setServerName] = useState('');
  const [errors, setErrors] = useState([]);

  const newServer = async e => {
    e.preventDefault();
    setErrors([])

    const newServer = {
      name: serverName,
      adminId: sessionUser.id,
    }

    if (serverName) {
      const data = await dispatch(serverActions.createServer(newServer));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      setServerName('');
      return;
    }

    setErrors(['Please provide a name for your new Solar System'])
  }

  return (
    <>
      <h1>SERVERS</h1>
      {errors.length === 0 ? null : errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={newServer}>
        <label htmlFor='name'>Server Name</label>
        <input
          type='text'
          name='name'
          value={serverName}
          onChange={e => setServerName(e.target.value)}
        />
        <button type='submit'>CREATE SERVER</button>
      </form>
    </>
  )
}

export default Servers;