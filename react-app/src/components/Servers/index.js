import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as serverActions from '../../store/server';

function Servers() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [serverName, setServerName] = useState('');

  const newServer = e => {
    e.preventDefault();
    const newServer = {
      name: serverName,
      adminId: sessionUser.id
    }
    dispatch(serverActions.createServer(newServer));
  }

  return (
    <>
      <h1>SERVERS</h1>
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
