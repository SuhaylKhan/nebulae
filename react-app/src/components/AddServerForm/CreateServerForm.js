import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as serverActions from '../../store/server';
import { authenticate } from '../../store/session';

function CreateServerForm({ props }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { onClose } = props;
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

    if (serverName.includes('#')) {
      setErrors(["Solar System name cannot contain ' # '"]);
      return;
    }

    if (serverName) {
      const data = await dispatch(serverActions.createServer(newServer));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      dispatch(authenticate());
      setErrors([]);
      setServerName('');
      onClose();
      history.push(`/servers/${data.id}/channels`);
      return;
    }

    setErrors(['Please provide a name for your new Solar System'])
  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>Create New Server</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        <form onSubmit={newServer}>
          <div className='server-input-container'>
            <label htmlFor='name'>SERVER NAME</label>
            <input
              type='text'
              name='name'
              value={serverName}
              onChange={e => setServerName(e.target.value)}
            />
          </div>
          <button
            className='server-button'
            type='submit'
          >
            CREATE SERVER
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateServerForm;
